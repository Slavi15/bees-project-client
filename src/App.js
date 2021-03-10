import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import MainPage from './components/MainPage.js';
import Products from './components/Products.js';
import Cart from './components/Cart.js';
import Form from './components/Form.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import PageNotFound from './components/PageNotFound.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainPage}></Route>
            <Route exact path="/store" component={Products}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/form" component={Form}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/404" component={PageNotFound}></Route>
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;