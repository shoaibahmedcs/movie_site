import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService.js';
import { validateEmail, validatePassword, validateConfirm, validateName } from '../utils/validators.js';
import FormInput from './FormInput';
import FormMessage from './FormMessage';

export default function SignupForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [cfMsg, setCfMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setNameMsg(validateName(name)), [name]);
  useEffect(() => setEmailMsg(validateEmail(email)), [email]);
  useEffect(() => setPwMsg(validatePassword(pw)), [pw]);
  useEffect(() => setCfMsg(validateConfirm(pw, cf)), [pw, cf]);

  const disabled = useMemo(() => !!(nameMsg || emailMsg || pwMsg || cfMsg) || isLoading, [nameMsg, emailMsg, pwMsg, cfMsg, isLoading]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    setIsLoading(true);
    try {
      await AuthService.signup({ name: name.trim(), email: email.trim(), password: pw });
      setGlobalMsg({ text: 'Account created successfully!', type: 'success' });
      setTimeout(() => {
        window.location.href = '/movie_site/';
      }, 1000);
    } catch (err) {
      setGlobalMsg({ text: err?.data?.message || 'Signup failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h1 className="auth-title">Create your account</h1>
      <form onSubmit={handleSubmit} noValidate className="auth-form">
        <FormInput
          icon="👤"
          label="Full name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          message={nameMsg}
          messageId="signupNameMsg"
        />

        <FormInput
          icon="@"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          message={emailMsg}
          messageId="signupEmailMsg"
        />

        <FormInput
          icon="🔒"
          label="Password"
          type="password"
          placeholder="Min 8 chars, A-Z, 0-9"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          message={pwMsg}
          messageId="signupPasswordMsg"
        />

        <FormInput
          icon="✅"
          label="Confirm password"
          type="password"
          placeholder="Repeat password"
          value={cf}
          onChange={(e) => setCf(e.target.value)}
          message={cfMsg}
          messageId="signupConfirmMsg"
        />

        <button 
          className="btn btn-primary" 
          type="submit" 
          disabled={disabled}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="auth-hint">
          Already have an account? <a className="auth-link" onClick={() => navigate('/login')}>Login</a>
        </p>

        <FormMessage message={globalMsg} />
      </form>
    </div>
  );
}
