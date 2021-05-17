import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from './reducers/cartReducers';
import { getProductsReducer, getProductDetailsReducer, getPaginProductsReducer } from './reducers/productReducers';
import { registerReducer, loginReducer } from './reducers/userReducers';
import { createReducer, orderReducer, paidReducer } from './reducers/orderReducers';

const reduser = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  getPaginProducts: getPaginProductsReducer,
  userRegister: registerReducer,
  userLogin: loginReducer,
  address: orderReducer,
  order: createReducer,
  paid: paidReducer
});

const middleware = [thunk];

const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const orderAddressFromLocalStorage = localStorage.getItem('orderAddress') ? JSON.parse(localStorage.getItem('orderAddress')) : null;
const paidStatusFromLocalStorage = localStorage.getItem('paidStatus') ? JSON.parse(localStorage.getItem('paidStatus')) : false;

const initialState = {
  cart: {
    cartItems: cartFromLocalStorage
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage
  },
  address: {
    orderAddress: orderAddressFromLocalStorage
  },
  paid: {
    paidStatus: paidStatusFromLocalStorage
  }
};

const store = createStore(
  reduser,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
