import React from 'react';
import './Subtotal.scss';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';

function Subtotal() {

    const [{ cartItems }] = useStateValue();
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
            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
