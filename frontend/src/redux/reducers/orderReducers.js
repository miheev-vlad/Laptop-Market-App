import * as actionTypes from '../constants/orderConstants';

export const orderReducer = (state = { orderAddress: null }, action) => {
  switch(action.type) {
    case actionTypes.SAVE_DELIVERY_ADDRESS:
      return {
        orderAddress: action.payload
      }
    case actionTypes.EDIT_DELIVERY_ADDRESS:
      return {
        orderAddress: null
      }
    default:
      return state;
  }
};

export const paidReducer = (state = { paidStatus: false, paidSumm: undefined }, action) => {
  switch(action.type) {
    case actionTypes.PAID_ORDER:
      return {
        paidStatus: true,
        paidSumm: action.payload.totalOrderCoast
      }
    case actionTypes.NOT_PAID_ORDER:
      return {
        paidStatus: false,
        paidSumm: undefined
      }
    default:
      return state;
  }
};

export const createReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.CREATE_ORDER_REQUEST:
      return {
        loading: true
      }
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        orderNumber: action.payload
      }
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
};