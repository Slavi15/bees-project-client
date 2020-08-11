import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './MainPage.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import Store from './components/Store.jsx';
import Cart from './components/Cart.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage}></Route>
            <Route exact path="/store" component={Store}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/404" component={PageNotFound}></Route>
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}