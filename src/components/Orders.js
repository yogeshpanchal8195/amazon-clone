import React, { useEffect, useState } from 'react'
import './Orders.scss'
import db from '../firebase'
import { useStateValue } from '../StateProvider';
import BasketItem from './BasketItem';
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';


function Orders() {
    const [{ cartItems, userData }] = useStateValue();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        debugger
        console.log(userData)
        if (userData) {
            db.collection('users').doc(userData.uid).collection('orders').orderBy('created', 'desc').onSnapshot((snapshot) => {
                //snapshot == order
                setOrders(snapshot.docs.map((ele) => (
                    {
                        data: ele.data(),
                        id: ele.id
                    }
                )))
                console.log(orders)
            })
        }
    }, [userData])

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <div className="orders">
            <h1>
                Your Orders
            </h1>
            {
                orders.map((order, idx) => (
                    // data: {items: Array(2), created: 1602058046, amount: 2448}
                    // id: "pi_1HZXgIB0Mgn79jXc9ipT6g8x"
                    <div className="order_data">
                        <div className="order_data_details">


                            <div className="order_data_amt">
                                <CurrencyFormat
                                    value={order.data.amount / 100}
                                    decimalScale={2}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    renderText={value =>
                                        <>
                                            <p>
                                                Total : <strong>{value}</strong>
                                            </p>
                                        </>
                                    }
                                />
                            </div>
                            <div className="order_data_date">Date : {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</div>
                        </div>
                        {
                            order.data.items.map((ele, index) => (
                                <BasketItem {...ele} hideButton={true} key={index} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Orders
