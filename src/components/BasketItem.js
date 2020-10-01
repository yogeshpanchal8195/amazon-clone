import React from 'react';
import './BasketItem.scss';
import { useStateValue } from '../StateProvider';

function BasketItem({ id, title, price, rating, imgUrl ,newId }) {

    const [,dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type:"REMOVE_FROM_CART",
            payload:newId
        })
    }

    return (
        <div className="basket_item">
            <div className="basket_item_image">
                <img src={imgUrl || "https://i.pinimg.com/originals/f7/6a/61/f76a61440698a93d40f1947be5b8ab52.png"} alt="" />
            </div>

            <div className="basket_item_info">
                <div className="basket_item_title">
                    {title}
                </div>
                <div className="basket_item_price">
                    <strong>$</strong>
                    <strong>{price}</strong>
                </div>
                <div className="basket_item_rating">
                    {Array(Math.floor(rating)).fill("⭐").map((ele,idx) => (
                        <div key={idx}>{ele}</div>
                    ))}
                </div>
                <div className="add_to_basket">
                    <button onClick={removeFromBasket}>Remove from basket</button>
                </div>
            </div>

        </div>
    )
}

export default BasketItem
