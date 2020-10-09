import React, { useState, useEffect } from 'react'
import './Payment.scss'
import { useStateValue } from '../StateProvider';
import BasketItem from './BasketItem';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from '../axios'
import { useHistory } from 'react-router-dom';
import db from '../firebase';


function Payment() {
    const [{ cartItems, userData }, dispatch] = useStateValue();

    const history = useHistory()

    const stripe = useStripe();
    const elements = useElements();

    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')


    useEffect(() => {
        const getClientSecKey = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${(cartItems && cartItems.length && cartItems.reduce((acc, obj) => acc + +obj.price, 0)) * 100 || 0}`
            })
            setClientSecret(response.data.clientSecret)
            console.log("response.data.clientSecret", response.data.clientSecret)
        }
        if (cartItems.length)
            getClientSecKey();
    }, [cartItems, cartItems.length])

    const onHandleChange = (event) => {
        console.log(event)
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }

    const handleSubmit = async (event) => {
        console.log(event)
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log("Error", error)
        console.log("paymentMethod", paymentMethod);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement('card')
            }
        }).then(({ paymentIntent }) => {
            if (paymentIntent && paymentIntent.status == "succeeded") {
                db.collection('users').doc(userData.uid).collection('orders').doc(paymentIntent.id).set({
                    created: paymentIntent.created,
                    amount: paymentIntent.amount,
                    items: cartItems
                })
                setProcessing(false);
                setError("");
                setSuccess(true);
                history.replace("/orders")
                dispatch({
                    type: "EMPTY_CART"
                })
            }
        }).catch((err) => {
            console.log(err);
            setProcessing(!false);
            setError(err);
            setSuccess(!true)
        })
    }

    return (
        <div className="payment">
            <div className="address_cont">
                <h2>
                    Checkout Items ({cartItems?.length})
                </h2>
            </div>
            <div className="items_cont">
                {cartItems.map((ele, idx) => (
                    <BasketItem {...ele} key={idx} />
                ))}
            </div>
            <div className="payment_cont">
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={onHandleChange} />
                    <CurrencyFormat
                        value={cartItems && cartItems.length && cartItems.reduce((acc, obj) => acc + +obj.price, 0)}
                        decimalScale={2}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={value =>
                            <>
                                <p>
                                    Subtotal ( {cartItems?.length} items ) : <strong>{value}</strong>
                                </p>
                                <small className="subtotal_condition">
                                </small>
                            </>
                        }
                    />
                    <button type="submit" disabled={disabled || processing || success}>
                        Pay
                    </button>
                </form>
                <div className="error-row">
                    {error && <div>{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Payment
