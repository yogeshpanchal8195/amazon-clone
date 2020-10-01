import React from 'react'
import BasketItem from './BasketItem'
import './Wishlist.scss'
import Subtotal from './Subtotal'
import { useStateValue } from '../StateProvider';

function Wishlist() {
    const [{ cartItems, userData }] = useStateValue();
    return (
        <div className="wishlist_cont">
            <div className="wishlist_cont_left">
                <div className="wishlist_cont_left_label">
                    <h3>Hello, {userData?.email}</h3>
                    <h2>Your shopping basket</h2>
                </div>
                {cartItems.map((ele, idx) => (
                    <BasketItem {...ele} key={idx} />
                ))}
            </div>
            <div className="wishlist_cont_right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Wishlist
