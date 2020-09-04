import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage.jsx';
import Store from './components/Store.jsx';
import Cart from './components/Cart.jsx';
import Form from './components/Form.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import PageNotFound from './components/PageNotFound.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage}></Route>
            <Route exact path="/store" component={Store}></Route>
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