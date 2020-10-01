import React from 'react';
import './Product.scss';
import { useStateValue } from '../StateProvider';

function Product(props) {
    const [{ cartItems }, dispatch] = useStateValue();

    const addTobasket = () => {
        console.log(props)
        dispatch({
            type: "ADD_TO_CART",
            payload: { ...props, newId: cartItems.length ? (cartItems[cartItems.length - 1]["newId"] + 1) : 1 }
        })
    }

    return (
        <div className="product">
            <div className="product_info">
                {props.title}
            </div>
            <div className="product_price">
                <strong>$</strong>
                <strong>{props.price}</strong>
            </div>
            <div className="product_rating">
                {Array(Math.floor(props.rating)).fill("⭐").map((ele,idx) => (
                    <div key={idx}>{ele}</div>
                ))}
            </div>
            <div className="product_image">
                <img src={props.imgUrl || "https://i.pinimg.com/originals/f7/6a/61/f76a61440698a93d40f1947be5b8ab52.png"} alt="" />
            </div>
            <div className="add_to_basket">
                <button onClick={addTobasket}>Add to basket</button>
            </div>
        </div>
    )
}

export default Product
