import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ResetPasswordScreen.css';

export const ResetPasswordScreen = ({ match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const resetPasswordHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    if (password !== confirmPassword) {
      setLoading(false);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError(`Passwords don't match`);
    }
    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        {
          password,
        },
        config
      );
      setLoading(false);
      setSuccess(data.data);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen_form"
      >
        <h3 className="resetpassword-screen_title">Reset Password</h3>
        {loading && <div className="loader"></div>}
        {!success && error && <span className="error-message">{error} </span>}
        {!error && success && (
          <span className="success-message">
            {success}. <Link to="/login" className="success-message-link"><b><ins>Now Login</ins></b></Link>
          </span>
        )}
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-btn auth-btn-primary" disabled={loading}>
          {loading ? 'Processed...' : 'Reset Password'}
        </button>
      </form>
    </div>
  )
}
