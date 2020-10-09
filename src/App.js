import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import Wishlist from './components/Wishlist';
import { useStateValue } from './StateProvider';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { auth } from './firebase';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders';

function App() {

  const stripePromise= loadStripe('Insert Public Key')

  const history = useHistory();
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The User is =>", authUser)
      if (authUser) {
        dispatch({
          type: "UPDATE_USER",
          payload: authUser
        })
      } else {
        dispatch({
          type: "UPDATE_USER",
          payload: null
        })
        history && history.push("/login")
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/" render={({ match: { url } }) => (
            <>
              <Header />
              <Route path={`${url}`} exact>
                <Home />
              </Route>
              <Route path={`${url}payment-checkout`} exact>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </Route>
              <Route path={`${url}checkout`} exact>
                <Wishlist />
              </Route>
              <Route path={`${url}orders`} exact>
                <Orders />
              </Route>
            </>
          )}>
          </Route>

          {/* <Route path="/" exact>
              <Header />
              <Home />
            </Route>
            <Route path="/checkout" exact>
              <Header />
              <Wishlist />
            </Route> */}

        </Switch>
      </Router>
    </div>
  );
}

export default App;
