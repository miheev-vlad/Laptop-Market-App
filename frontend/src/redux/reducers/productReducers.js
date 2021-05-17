import * as actionTypes from '../constants/productConstants';

export const getProductsReducer = (state = { products: [] }, action) => {
  switch(action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
};

export const getPaginProductsReducer = (state = { products: [] }, action) => {
  switch(action.type) {
    case actionTypes.GET_PAGIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }
    case actionTypes.GET_PAGIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        count: action.payload.count,
        page: action.payload.page,
        pages: action.payload.pages
      }
    case actionTypes.GET_PAGIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch(action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true
      }
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      }
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {}
      }
    default:
      return state;
  }
}