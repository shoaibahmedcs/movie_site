import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormMessage from '../components/FormMessage';
import { validateEmail } from '../utils/validators';
import './Login.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailMsg(validateEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw { data, status: response.status };
      }

      setResetToken(data.resetToken); // For development only
      setGlobalMsg({ 
        text: `Reset code sent! Code: ${data.resetToken} (valid for 15 minutes)`, 
        type: 'success' 
      });
      
      // Navigate to reset password page after 2 seconds
      setTimeout(() => {
        navigate('/reset-password', { state: { email: email.trim() } });
      }, 2000);
    } catch (err) {
      setGlobalMsg({ 
        text: err?.data?.message || 'Failed to send reset code', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>
        <p style={{ textAlign: 'center', color: '#b3b3b3', marginBottom: '20px', fontSize: '14px' }}>
          Enter your email to receive a password reset code
        </p>
        
        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <FormInput
            icon="@"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            message={emailMsg}
            messageId="forgotEmailMsg"
          />

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!!emailMsg || isLoading}
          >
            {isLoading ? 'Sending code...' : 'Send Reset Code'}
          </button>

          <p className="auth-hint">
            Remember your password? <a className="auth-link" onClick={() => navigate('/login')}>Back to Login</a>
          </p>

          <FormMessage message={globalMsg} />
        </form>
      </div>
    </div>
  );
}
