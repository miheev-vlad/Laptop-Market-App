import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { Link, useHistory } from 'react-router-dom';
import './CartScreen.css';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

const CartScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty))
  }
  const removeHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }
  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => (item.price * item.qty) + price, 0)
  }
  const placeorderHandler = () => {
    if (userInfo) {
      history.push('/placeorder');
    } else {
      history.push('/login?redirect=placeorder');
    }
  }
  return (
    <div className="cartscreen">
      <div className="cartscreen_left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="cart_empty_message">
            Your cart is empty. <Link to="/" className="go_shopping_link">Go shopping</Link>
          </div>
        ) : (          
          cartItems.map((item) => (
            <CartItem key={item.product} item={item} qtyChangeHandler={qtyChangeHandler} removeHandler={removeHandler} link="true" />
          ))
        )}
        {cartItems.length > 0 && (
          <div className="continue_shopping_message">
            <Link to="/" className="go_shopping_link">Continue shopping...</Link>
          </div>
        )} 
      </div>
      <div className="cartscreen_right">
        <div className="cartscreen_info">
          <p>Subtotal: ({getCartCount()}) items</p>
          <p><b>${getCartSubTotal().toFixed(2)}</b></p>
        </div>
        <div>
          <button
            className="cart-btn"
            onClick={placeorderHandler}
            disabled={cartItems.length === 0}
          >
            Proceed To Checkout
          </button>
      </div>
      </div>
    </div>
  )
}

export default CartScreen;
