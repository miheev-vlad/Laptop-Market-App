import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import NavBar from './components/NavBar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';
import PrivateRoute from './components/routing/PrivateRoute';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { LoginScreen } from './components/auth_screens/LoginScreen';
import { RegisterScreen } from './components/auth_screens/RegisterScreen';
import { ForgotPasswordScreen } from './components/auth_screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from './components/auth_screens/ResetPasswordScreen';
import { OrderScreen } from './screens/OrderScreen';

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      <NavBar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Switch>
          <PrivateRoute exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart" component={CartScreen} />
          <Route path="/order" component={OrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
