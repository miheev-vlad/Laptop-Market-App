import './ProductScreen.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import Loader from '../components/loader/Loader';
import Slider from '../components/slider/Slider';
import { Link } from 'react-router-dom';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id))
    }
  }, [dispatch, product, match]);
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push('/cart')
  }
  const [slideIndex, setSlideIndex] = useState(0);
  const plusSlide = (imgArr) => {
    if (slideIndex == imgArr.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };
  const minusSlide = (imgArr) => {
    if (slideIndex == 0) {
      setSlideIndex(imgArr.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let inCart;
  if (product) {
    inCart = cartItems.map((item) => item.product).includes(product._id);
  }
  return (
    <>
      {!loading && 
        (<div className="go_back_message">
          <Link to="/" className="go_back_link"><i className="fas fa-arrow-left"></i> Go back</Link>
        </div>)}
      <div className="productscreen">
        {loading ? <Loader /> : error ? <h2>{error}</h2> : (
          <>
            <div className="productscreen_left">
              <div className="left_image">
                {product.images && product.images.length === 1 &&
                  (<img
                    src={product.images ? product.images[0] : 'loading...'}
                    alt={product.model}
                  />)
                }
                {product.images && product.images.length > 1 &&
                  (<Slider imgArr={product.images} plusSlide={plusSlide} minusSlide={minusSlide} slideIndex={slideIndex} />)
                }
              </div>
              <div className="left_info">
                <p className="left_name">{product.model}</p>
                <p className="left_price">Price: ${product.price}</p>
                <p className="left_description">Description: {product.description}</p>
              </div>
            </div>
            <div className="productscreen_right">
              <div className="right_info">
                <p>
                  Price: <span>${product.price}</span>
                </p>
                <p>
                  Status: <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </p>
                <p>
                  Qty
                  <select value={qty} onChange={(e) => setQty(e.target.value)} disabled={inCart}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </p>
                {inCart ? (
                  <div className="incart-message">
                    Already In Cart
                  </div>
                ) : (
                  <p>
                    <button type="button" onClick={addToCartHandler}>Add To Cart</button>
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ProductScreen;
