import React, { useEffect, useMemo, useState } from 'react';
import AuthForm from './AuthForm.jsx';
import AuthService from '../Services/authService.js';
import { validateEmail, validatePassword } from '../utils/validators.js';
import { getRememberEmail, setRememberEmail } from '../utils/storage.js';

export default function LoginForm() {
  const [email, setEmail] = useState(getRememberEmail());
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(!!getRememberEmail());
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });

  const isDisabled = useMemo(() => !!(emailMsg || pwMsg), [emailMsg, pwMsg]);

  useEffect(() => {
    setEmailMsg(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setPwMsg(validatePassword(password));
  }, [password]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    try {
      await AuthService.login({ email: email.trim(), password });
      if (remember) setRememberEmail(email.trim());
      setGlobalMsg({ text: 'Login successful', type: 'success' });
      setTimeout(() => (window.location.hash = '#/dashboard'), 500);
    } catch (err) {
      setGlobalMsg({ text: err?.data?.message || 'Invalid credentials', type: 'error' });
    }
  }

  return (
    <AuthForm title="Login">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <div className="label"><span className="icon">@</span><span>Email</span></div>
          <div className="input-wrap">
            <input
              className="input"
              id="loginEmail"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="loginEmailMsg"
              aria-required="true"
            />
          </div>
          <p id="loginEmailMsg" className={`msg ${emailMsg ? 'error' : ''}`}>{emailMsg}</p>
        </div>

        <div className="form-group">
          <div className="label"><span className="icon">🔒</span><span>Password</span></div>
          <div className="input-wrap">
            <input
              className="input"
              id="loginPassword"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="loginPasswordMsg"
              aria-required="true"
            />
          </div>
          <p id="loginPasswordMsg" className={`msg ${pwMsg ? 'error' : ''}`}>{pwMsg}</p>
        </div>

        <div className="row">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              aria-label="Remember me"
            />
            <span>Remember me</span>
          </label>
          <a className="link" href="#/forgot">Forgot password?</a>
        </div>

        <button className="btn" type="submit" disabled={isDisabled}>Login</button>

        <p className="hint">New here? <a className="link" href="#/signup">Create account</a></p>
        <p className={`msg ${globalMsg.type}`}>{globalMsg.text}</p>
      </form>
    </AuthForm>
  );
}
