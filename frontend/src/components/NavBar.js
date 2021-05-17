import './NavBar.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const NavBar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { token } = userRegister;
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <Link to="/" className="logo_link">
          <h2><i className="fas fa-laptop-code"></i> LapTop Market</h2>
        </Link>
      </div>
      <ul className="navbar_links">
        <li>
          <Link to="/cart" className="cart_link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart
              <span className="cartlogo_badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        {userInfo || token ? (
          <li>
            <Link onClick={logoutHandler} to="#" className="auth-log">
              LogOut
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="auth-log">
              LogIn
            </Link>
          </li>
        )}
      </ul>
      <div
        className="hamburger_menu"
        onClick={click}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default NavBar;
