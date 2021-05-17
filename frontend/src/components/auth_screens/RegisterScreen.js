import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './RegisterScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';

export const RegisterScreen = (props) => {
  const history = useHistory();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [registerErr, setRegisterErr] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { token, loading, error } = userRegister;
  const dispatch = useDispatch();
  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    if (password !== confirmpassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setRegisterErr('');
      }, 5000);
      return setRegisterErr('Passwords do not match');
    }
    dispatch(register(username, email, password))
  };
  useEffect(() => {
    if (token) {
      history.push(redirect);
    }
    if (error) {
      if (error.match('Path')) {
        setRegisterErr('Password is shorter than the minimum allowed length of 6 characters');
        setTimeout(() => {
          setRegisterErr('');
        }, 7000);
      } else if (error.match('Duplicate Field Value Enter')) {
        setRegisterErr('User with this email is already registered');
        setTimeout(() => {
          setRegisterErr('');
        }, 7000);
      } else if (error.match('Request failed with status code 500')) {
        setRegisterErr('Sorry... Server error');
        setTimeout(() => {
          setRegisterErr('');
        }, 7000);
      } else {
        setRegisterErr(error);
        setTimeout(() => {
          setRegisterErr('');
        }, 10000);
      }
    }
  }, [history, token, error, redirect]);
  return (
    <div className="register-screen">
      <form className="register-screen_form" onSubmit={registerHandler}>
        <h3 className="register-screen_title">Register</h3>
        {loading && <div className="loader"></div>}
        {registerErr && <span className="error-message">{registerErr}</span>}
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-btn auth-btn-primary" disabled={loading}>
          {loading ? 'Processed...' : 'Register'}
        </button>
        <span className="register-screen_subtext">
          Already have an account? <Link to="/login" className="register-screen_subtext-link"><b>LogIn</b></Link>
        </span>
      </form>
    </div>
  )
}
