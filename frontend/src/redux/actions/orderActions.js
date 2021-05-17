import * as actionTypes from '../constants/orderConstants';
import axios from 'axios';

export const saveDeliveryAddress = (city, street, house, apartment, date) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.SAVE_DELIVERY_ADDRESS,
    payload: {
      city,
      street,
      house, 
      apartment,
      date
    },
  });
  localStorage.setItem('orderAddress', JSON.stringify(getState().address.orderAddress));
};

export const editDeliveryAddress = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.EDIT_DELIVERY_ADDRESS });
  localStorage.setItem('orderAddress', JSON.stringify(getState().address.orderAddress));
};

export const paidOrder = (totalOrderCoast) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.PAID_ORDER, payload: { totalOrderCoast } });
  localStorage.setItem('paidStatus', JSON.stringify(getState().paid.paidStatus));
};

export const notPaidOrder = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.NOT_PAID_ORDER });
  localStorage.setItem('paidStatus', JSON.stringify(getState().paid.paidStatus));
};

export const create = (cartItems, orderAddress, paidStatus, paidSumm) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
    },
  };
  try {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST, payload: { cartItems, orderAddress, paidStatus, paidSumm } });
    const { data } = await axios.post(
      '/api/orders/create',
      {
        cartItems,
        orderAddress,
        paidStatus,
        paidSumm
      },
      config
    );
    dispatch({ type: actionTypes.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};