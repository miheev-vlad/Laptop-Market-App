import { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordScreen.css';

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const forgotPasswordHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        '/api/auth/forgotpassword',
        { email },
        config
      );
      setLoading(false);
      setSuccess(data.data);
      setTimeout(() => {
        setSuccess('');
      }, 10000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      setEmail('');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen_form"
      >
        <h3 className="forgotpassword-screen_title">Forgot Password</h3>
        {loading && <div className="loader"></div>}
        {!success && error && <span className="error-message">{error}</span>}
        {!error && success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen_subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email.
          </p>
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
        <button type="submit" className="auth-btn auth-btn-primary" disabled={loading}>
          {loading ? 'Processed...' : 'Send Email'}
        </button>
      </form>
    </div>
  )
}
