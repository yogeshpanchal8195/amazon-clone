import React from 'react';
import './Header.scss';
import { Search, ShoppingBasket } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {
    const [{ cartItems, userData }] = useStateValue();

    const checkAuthentication = () => {
        auth.signOut();
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            </Link>
            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <Search className="header_search_icon" />
            </div>
            <div className="header_nav">
                {/* {
                        !userData ?
                        <Link to="/login">
                        <span className="header_optionLineOne">Hello</span>
                        <span className="header_optionLineTwo">Sign In</span>
                        </Link>
                        :
                        <>
                        <span className="header_optionLineOne">Hello</span>
                        <span className="header_optionLineTwo">{userData?.email}</span>
                        </>
                    } */}
                <Link to={!userData && "/login"}>
                    <div className="header_option" onClick={checkAuthentication}>
                        <span className="header_optionLineOne">Hello {userData?.email}</span>
                        <span className="header_optionLineTwo">{!userData ? 'Sign In' : 'Sign Out'}</span>
                    </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">Returns</span>
                    <span className="header_optionLineTwo">Orders</span>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">Your </span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <div className=" header_option header_optionBasket">
                    <Link to="/checkout">
                        <ShoppingBasket />
                    </Link>
                    <span className="header_optionLineTwo">{cartItems?.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Header
