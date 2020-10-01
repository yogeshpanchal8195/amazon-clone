import React, { useState } from 'react';
import './Login.scss';
import { Link, useHistory } from 'react-router-dom';
import db, { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();
    const [{ }, dispatch] = useStateValue();

    const loginClick = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            console.log("AUTH", auth.user)
            if (auth) {
                history.push("/")
            }
        }).catch((err) => {
            err && err.message && alert(err.message);
            err && console.warn(err);
        })
        // db.collection('users').onSnapshot((snapshot) => {
        //     var user = snapshot.docs.find((doc) => doc.data().email == email).data();
        //     console.log("USERRR", user);
        //     if (user && user.password == password) {
        //         delete user.password
        //         dispatch({
        //             type: "UPDATE_USER",
        //             payload: user
        //         })
        //         history.push('/');
        //     } else {
        //         if (!user) {
        //             alert("Email Id doesn't exist");
        //         } else {
        //             alert("Invalid Credentials");
        //         }
        //     }
        // })
        // return false;
    }

    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            console.log("AUTH", auth.user)
            if (auth) {
                history.push("/")
            }
        }).catch((err) => {
            err && err.message && alert(err.message);
            err && console.warn(err);
        })
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" alt="" />
            </Link>
            <div className="login_cont">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} name="email" id="email" onChange={updateEmail} minLength='1' maxLength='50' />
                    <h5>Password</h5>
                    <input type="password" value={password} name="password" id="password" onChange={updatePassword} minLength='1' maxLength='50' />
                    <button className="login_signIn" onClick={loginClick}>Sign In</button>
                </form>
                <p>By Signing in you agree to all the conditions of use & sale</p>
                {/* <Link to="/signup">
                    <button className="login_signUp">Create a Amazon Account</button>
                </Link> */}
                <button className="login_signUp" onClick={signUp}>Create a Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
