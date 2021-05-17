import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import { removeAllFromCart } from '../redux/actions/cartActions';
import { create, notPaidOrder } from '../redux/actions/orderActions';
import './OrderScreen.css'

export const OrderScreen = () => {
  const paid = useSelector((state) => state.paid);
  const { paidStatus, paidSumm } = paid;
  const address = useSelector((state) => state.address);
  const { orderAddress } = address;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const order = useSelector((state) => state.order);
  const { orderNumber, error, loading } = order;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(create(cartItems, orderAddress, paidStatus, paidSumm));
    dispatch(removeAllFromCart());
    dispatch(notPaidOrder());
  }, []);
  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && orderNumber && (
        <>
          <div className="ordercreated-screen">
            <p>Order #{orderNumber && orderNumber.order._id} created.</p>
            <p>Thank you for the order. Information about the order has been sent to the email you specified during registration.</p>
          </div>
          <div className="continue_shopping_message">
            <Link to="/" className="go_shopping_link">Continue shopping...</Link>
          </div>
        </>
      )}
      {loading && <Loader />}
    </div>
  )
}
