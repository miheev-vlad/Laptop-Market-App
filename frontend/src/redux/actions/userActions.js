import * as actionTypes from '../constants/userConstants';
import axios from 'axios';

export const register = (username, email, password) => async (dispatch, getState) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };
  try {
    dispatch({ type: actionTypes.USER_REGISTER_REQUEST, payload: { username, email, password } });
    const { data } = await axios.post(
      '/api/auth/register',
      {
        username,
        email,
        password,
      },
      config
    );
    dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch, getState) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };
  try {
    dispatch({ type: actionTypes.USER_LOGIN_REQUEST, payload: { email, password } });
    const { data } = await axios.post(
      '/api/auth/login',
      { email, password },
      config
    );
    dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.USER_LOGOUT });
  localStorage.removeItem('userInfo');
};