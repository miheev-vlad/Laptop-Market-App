import { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import './PlaceOrderScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { editDeliveryAddress, paidOrder, saveDeliveryAddress } from '../redux/actions/orderActions';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';

export const PlaceOrderScreen = () => {
  const history = useHistory();
  const address = useSelector((state) => state.address);
  const { orderAddress } = address;
  const [err, setErr] = useState('');
  const [errAddr, setErrAddr] = useState(false);
  const [privateData, setPrivateData] = useState('');
  const [city, setCity] = useState(orderAddress ? orderAddress.city : '');
  const [street, setStreet] = useState(orderAddress ? orderAddress.street : '');
  const [house, setHouse] = useState(orderAddress ? orderAddress.house : '');
  const [apartment, setApartment] = useState(orderAddress ? orderAddress.apartment : '');
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const paid = useSelector((state) => state.paid);
  const { paidStatus } = paid;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        },
      };
      try {
        const { data } = await axios.get('/api/user/profile', config);
        setPrivateData(data.user);
      } catch (error) {
        if (error.message.match('Request failed with status code 500')) {
          setErr('Sorry... Server error');
        } else if (error.message.match('Request failed with status code 401')) {
          setErr('Please login again');
          dispatch(logout());
          setTimeout(() => {
            history.push('/login?redirect=placeorder');
          }, 2000);
        } else {
        setErr(error.message || 'Some error happened');
        }
      }
    };
    fetchPrivateDate();
  }, []);
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }
  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => (item.price * item.qty) + price, 0)
  }
  const date = new Date();
  date.setDate(date.getDate() + 5);
  const saveAddressHandler = () => {
    if (!city || !street || !house || !apartment) {
      setTimeout(() => {
        setErrAddr('');
      }, 3000);
      return setErrAddr('Please fill in all fields');
    }
    dispatch(saveDeliveryAddress(city, street, house, apartment, date));
  }
  const placeOrderHandler = () => {
    history.push('/order');
  }
  const editAddressHandler = () => {
    dispatch(editDeliveryAddress());
  }
  const totalOrderCoast = Number(getCartSubTotal() + (getCartSubTotal() * 0.05)).toFixed(2);
  const paidOrderHandler = () => {
    dispatch(paidOrder(totalOrderCoast));
  }
  return err ? (
    <div className="orderscreen-error">
      <span className="error-message">{err}</span>
    </div>
    ) : (
      <>
        <h1>Order Information</h1>
        <div className="orderscreen">
          <div className="orderscreen_left">
            <h2>Items Info:</h2>
            <p><span className="order-fields">SUBTOTAL:</span> {getCartCount()} items</p>
            {cartItems.map((item) => (
                <CartItem key={item.product} item={item} />
              ))
            }
          </div>
          <div className="orderscreen_right">
            <div className="orderscreen_info">
              <h2>User Info:</h2>
              <p><span className="order-fields">NAME:</span> {privateData ? privateData.username : 'loading...'}</p>
              <p><span className="order-fields">EMAIL:</span> {privateData ? privateData.email : 'loading...'}</p>
              <p><span className="order-fields">DELIVERY DAY:</span> {date.toDateString()}</p>
              {!orderAddress && (
                <div className="notPaid">Delivery Address not saved!</div>
              )}
              <p><span className="order-fields">DELIVERY ADDRESS:</span></p>
              {!orderAddress ? (
                <form>
                  {errAddr && <span className="error-message">{errAddr}</span>}
                  <span className="delivery-address-label">
                    <input
                      type="text"
                      required
                      id="city"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </span>
                  <br />
                  <span className="delivery-address-label">
                    <input
                      type="text"
                      required
                      id="street"
                      placeholder="Enter Street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </span>
                  <br />
                  <span className="delivery-address-label">
                    <input
                      type="text"
                      required
                      id="house"
                      placeholder="Enter House"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                    />
                  </span>
                  <br />
                  <span className="delivery-address-label">
                    <input
                      type="text"
                      required
                      id="apartment"
                      placeholder="Enter Apartment"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                  </span>
                  <button type="button" className="saveAddress-btn" onClick={saveAddressHandler}>Save Address</button>
                </form>
              ) : (
                <form>
                  <p><span className="order-fields userAddress">City:</span> {orderAddress.city}</p>
                  <p><span className="order-fields userAddress">Street:</span> {orderAddress.street}</p>
                  <p><span className="order-fields userAddress">House:</span> {orderAddress.house}</p>
                  <p><span className="order-fields userAddress">Apartment:</span> {orderAddress.apartment}</p>
                  <button type="button" className="saveAddress-btn" onClick={editAddressHandler}>Edit Address</button>
                </form>
              )}
              <br />
              <h2>Payment Info:</h2>
              <p><span className="order-fields">ITEMS PRICE</span>: ${getCartSubTotal().toFixed(2)}</p>
              <p><span className="order-fields">COST OF DELIVERY:</span> ${(getCartSubTotal() * 0.05).toFixed(2)}</p>
              <p><b>TOTAL ORDER COST: ${totalOrderCoast}</b></p>
              {!paidStatus && (
                <div className="notPaid">Not Paid! Use PayPal to pay now</div>
              )}
              {!paidStatus && (
                <PayPalButton
                  onClick={paidOrderHandler}
                />
              )}
              {paidStatus && (
                <div className="successPaid"><i className="fas fa-check"></i> Successfully Paid</div>
              )}
            </div>
            <hr />
            <div>
              <button type="button" className="placeOrder-btn" onClick={placeOrderHandler} disabled={!paidStatus || !orderAddress}>Place Order</button>
            </div>
          </div>
        </div>
      </>
    );
}
