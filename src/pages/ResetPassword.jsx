import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../services/authService.js';
import { validatePassword, validateConfirm } from '../utils/validators.js';
import FormInput from '../components/FormInput';
import FormMessage from '../components/FormMessage';
import TokenWarning from '../components/TokenWarning';
import './ResetPassword.css';

function useQuery() {
  const raw = window.location.hash.split('?')[1] || '';
  return new URLSearchParams(raw);
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const qs = useQuery();
  const emailFromState = location.state?.email || qs.get('email') || '';
  const tokenFromQuery = qs.get('token') || '';
  
  const [email, setEmail] = useState(emailFromState);
  const [token, setToken] = useState(tokenFromQuery);
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [cfMsg, setCfMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const tokenValid = !!email && !!token;

  useEffect(() => setPwMsg(validatePassword(pw)), [pw]);
  useEffect(() => setCfMsg(validateConfirm(pw, cf)), [pw, cf]);

  const disabled = useMemo(
    () => !tokenValid || !!(pwMsg || cfMsg) || isLoading,
    [tokenValid, pwMsg, cfMsg, isLoading]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          resetToken: token.trim(),
          newPassword: pw,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw { data, status: response.status };
      }

      setGlobalMsg({ text: 'Password updated. Please login.', type: 'success' });
      setTimeout(() => navigate('/login'), 700);
    } catch (err) {
      setGlobalMsg({ text: err?.data?.message || 'Reset failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="reset-password-container">
      <div className="auth-card">
        <h1 className="auth-title">Set a new password</h1>
        
        {!tokenValid && <TokenWarning />}
        
        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <FormInput
            icon="🔒"
            label="New password"
            type="password"
            placeholder="Min 8 chars, A-Z, 0-9"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            message={pwMsg}
            messageId="resetPasswordMsg"
            disabled={!tokenValid}
          />

          <FormInput
            icon="✅"
            label="Confirm password"
            type="password"
            placeholder="Repeat password"
            value={cf}
            onChange={(e) => setCf(e.target.value)}
            message={cfMsg}
            messageId="resetConfirmMsg"
            disabled={!tokenValid}
          />

          <button
            className="btn btn-primary"
            type="submit"
            disabled={disabled}
          >
            {isLoading ? 'Updating password...' : 'Update password'}
          </button>

          <p className="auth-hint">
            <a className="auth-link" onClick={() => navigate('/login')}>Back to login</a>
          </p>

          <FormMessage message={globalMsg} />
        </form>
      </div>
    </div>
  );
}
