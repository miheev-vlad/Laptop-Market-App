import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import './SideDrawer.css';

const SideDrawer = ({ show, click }) => {
  const history = useHistory();
  const sideDrawerClass = ['sidedrawer'];
  if (show) {
    sideDrawerClass.push('show');
  }
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <div className={sideDrawerClass.join(' ')}>
      <ul className="sidedrawer_links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart
              <span className="sidedrawer_cartbage">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        {userInfo ? (
          <li>
            <Link onClick={logoutHandler} to="#">
              LogOut
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">
              LogIn
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
};

export default SideDrawer;
