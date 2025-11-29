import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService.js';
import { validateEmail, validatePassword } from '../utils/validators.js';
import { getRememberEmail, setRememberEmail } from '../utils/storage.js';
import FormInput from './FormInput';
import FormMessage from './FormMessage';
import RememberCheckbox from './RememberCheckbox';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(getRememberEmail());
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(!!getRememberEmail());
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = useMemo(() => !!(emailMsg || pwMsg) || isLoading, [emailMsg, pwMsg, isLoading]);

  useEffect(() => {
    setEmailMsg(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setPwMsg(validatePassword(password));
  }, [password]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    setIsLoading(true);
    try {
      await AuthService.login({ email: email.trim(), password });
      if (remember) {
        setRememberEmail(email.trim());
      } else {
        setRememberEmail('');
      }
      setGlobalMsg({ text: 'Login successful', type: 'success' });
      setTimeout(() => {
        window.location.href = '/movie_site/';
      }, 500);
    } catch (err) {
      setGlobalMsg({ text: err?.data?.message || 'Invalid credentials', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h1 className="auth-title">Login</h1>
      <form onSubmit={handleSubmit} noValidate className="auth-form">
        <FormInput
          icon="@"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          message={emailMsg}
          messageId="loginEmailMsg"
        />

        <FormInput
          icon="🔒"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          message={pwMsg}
          messageId="loginPasswordMsg"
        />

        <div className="form-row">
          <RememberCheckbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <a className="auth-link" onClick={() => navigate('/forgot-password')}>Forgot password?</a>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isDisabled}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="auth-hint">
          New here? <a className="auth-link" onClick={() => navigate('/signup')}>Create account</a>
        </p>

        <FormMessage message={globalMsg} />
      </form>
    </div>
  );
}
