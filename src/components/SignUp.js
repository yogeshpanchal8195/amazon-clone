import React, { useReducer, useEffect } from 'react';
import './SignUp.scss';
import { Link, useHistory } from 'react-router-dom';
import db, { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';

function SignUp() {
    const initialState = {
        name: "",
        email: "",
        password: "",
        conPassword: ""
    }

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case "UPDATE_STATE":
                return {
                    ...state,
                    [action.name]: action.value
                }
            default:
                return state;
        }
    }

    const [state, dispatchEvent] = useReducer(reducer, initialState)
    const history = useHistory();
    const [{ }, dispatch] = useStateValue();

    const createAccount = (event) => {
        event.preventDefault();
        if (!state.name) {
            alert("Name is required")
            document.getElementById("name").classList.add("error")
            document.getElementById("name").focus();
            return false;
        } else {
            document.getElementById("name").classList.remove("error")
        }
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(state.email)) {
            alert("email Id is not valid")
            document.getElementById("email").classList.add("error")
            document.getElementById("email").focus();
            return false;
        } else {
            document.getElementById("email").classList.remove("error")
        }
        if (!state.password || !state.conPassword || state.password !== state.conPassword) {
            alert("Incorrect password")
            document.getElementById("password").classList.add("error")
            document.getElementById("password").focus();
            return false;
        } else {
            document.getElementById("password").classList.remove("error")
        }
        var obj = { ...state };
        delete obj.conPassword;
        var email = obj.email;
        db.collection('users').onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
            console.log("EMail", email)
            console.log("STATE EMail", state.email)
            var user = snapshot.docs.find((doc) => doc.data().email == state.email && state.email == email)?.data()
            console.log("USER", user);
            if (user) {
                console.log("If", user)
                alert("User already Exist. Please Login")
                history.push('/login');
            } else {
                console.log("Else")
                var aa = db.collection('users').add({
                    ...obj
                }).then((data) => {
                    console.log("Data", data);
                    delete obj.password
                    dispatch({
                        type: "UPDATE_USER",
                        payload: obj
                    })
                    history.push('/');
                })
            }
        })
        return false;
    }

    const updateState = (event) => {
        dispatchEvent({
            type: "UPDATE_STATE",
            name: event.target.name,
            value: event.target.value
        })
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" alt="" />
            </Link>
            <div className="login_cont">
                <h1>Sign Up</h1>
                <form>
                    <h5>Name</h5>
                    <input name="name" id="name" type="text" required={true} value={state.name} onChange={updateState} minLength='1' maxLength='50' />
                    <h5>E-mail</h5>
                    <input name="email" id="email" type="text" required={true} value={state.email} onChange={updateState} minLength='1' maxLength='50' />
                    <h5>Password</h5>
                    <input name="password" id="password" type="password" required={true} value={state.password} onChange={updateState} minLength='1' maxLength='50' />
                    <h5>Re-enter Password</h5>
                    <input name="conPassword" type="password" required={true} value={state.conPassword} onChange={updateState} minLength='1' maxLength='50' />
                    <button className="login_signIn" onClick={createAccount}>Create your Amazon Account</button>
                </form>
                <p>
                    Already have an account?
                    <Link to="/login">
                        Sign-In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
