import React from 'react';
import './Subtotal.scss';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import { Link, useHistory } from 'react-router-dom';

function Subtotal() {

    const [{ cartItems, userData }] = useStateValue();
    const history = useHistory()

    const redirect = () => {
        console.log(userData)
        if (userData && userData.uid)
            history.push('/payment-checkout');
        else {
            alert('Please login first.')
            history.push('/login');
        }
    }
    return (
        <div className="subtotal">
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
                            <input type="checkbox" />This order contains a gift
                        </small>
                    </>
                }
            />
            <button onClick={redirect}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
