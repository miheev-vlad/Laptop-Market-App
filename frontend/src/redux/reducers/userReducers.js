import * as actionTypes from '../constants/userConstants';

export const registerReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return {
        loading: true
      }
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        token: action.payload
      }
    case actionTypes.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
};

export const loginReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true
      }
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload
      }
    case actionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case actionTypes.USER_LOGOUT:
      return {};
    default:
      return state
  }
};