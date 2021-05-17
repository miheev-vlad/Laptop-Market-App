import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginScreen.css';
import { login } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export const LoginScreen = (props) => {
  const history = useHistory();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (error) {
      setLoginErr(error);
      setTimeout(() => {
        setLoginErr('');
      }, 5000);
    }
  }, [history, userInfo, error, redirect]);
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  };
  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen_form">
        <h3 className="login-screen_title">LogIn</h3>
        {loading && <div className="loader"></div>}
        {loginErr && <span className="error-message">{loginErr}</span>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
          <Link to="/forgotpassword" className="login-screen_forgotpassword">
              Forgot Password?
          </Link>
        </div>
        <br />
        <button type="submit" className="auth-btn auth-btn-primary" disabled={loading}>
          {loading ? 'Processed...' : 'Login'}
        </button>
        <span className="login-screen_subtext">
          Don't have an account? <Link to={`/register?redirect=${redirect}`} className="login-screen_subtext-link"><b>Register</b></Link>
        </span>
      </form>
    </div>
  )
}
