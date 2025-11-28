import React, { useEffect, useMemo, useState } from 'react';
import AuthForm from './AuthForm.jsx';
import AuthService from '../Services/authService.js';
import { validateEmail, validatePassword, validateConfirm, validateName } from '../utils/validators.js';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [cfMsg, setCfMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });

  useEffect(() => setNameMsg(validateName(name)), [name]);
  useEffect(() => setEmailMsg(validateEmail(email)), [email]);
  useEffect(() => setPwMsg(validatePassword(pw)), [pw]);
  useEffect(() => setCfMsg(validateConfirm(pw, cf)), [pw, cf]);

  const disabled = useMemo(() => !!(nameMsg || emailMsg || pwMsg || cfMsg), [nameMsg, emailMsg, pwMsg, cfMsg]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    try {
      await AuthService.signup({ name: name.trim(), email: email.trim(), password: pw });
      setGlobalMsg({ text: 'Account created. Please login.', type: 'success' });
      setTimeout(() => (window.location.hash = '#/login'), 700);
    } catch (err) {
      setGlobalMsg({ text: err?.data?.message || 'Signup failed', type: 'error' });
    }
  }

  return (
    <AuthForm title="Create your account">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <div className="label"><span className="icon">👤</span><span>Full name</span></div>
          <div className="input-wrap">
            <input className="input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="signupNameMsg" aria-required="true" />
          </div>
          <p id="signupNameMsg" className={`msg ${nameMsg ? 'error' : ''}`}>{nameMsg}</p>
        </div>

        <div className="form-group">
          <div className="label"><span className="icon">@</span><span>Email</span></div>
          <div className="input-wrap">
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="signupEmailMsg" aria-required="true" />
          </div>
          <p id="signupEmailMsg" className={`msg ${emailMsg ? 'error' : ''}`}>{emailMsg}</p>
        </div>

        <div className="form-group">
          <div className="label"><span className="icon">🔒</span><span>Password</span></div>
          <div className="input-wrap">
            <input className="input" type="password" placeholder="Min 8 chars, A-Z, 0-9" value={pw} onChange={(e) => setPw(e.target.value)} aria-describedby="signupPasswordMsg" aria-required="true" />
          </div>
          <p id="signupPasswordMsg" className={`msg ${pwMsg ? 'error' : ''}`}>{pwMsg}</p>
        </div>

        <div className="form-group">
          <div className="label"><span className="icon">✅</span><span>Confirm password</span></div>
          <div className="input-wrap">
            <input className="input" type="password" placeholder="Repeat password" value={cf} onChange={(e) => setCf(e.target.value)} aria-describedby="signupConfirmMsg" aria-required="true" />
          </div>
          <p id="signupConfirmMsg" className={`msg ${cfMsg ? 'error' : ''}`}>{cfMsg}</p>
        </div>

        <button className="btn" type="submit" disabled={disabled}>Create account</button>
        <p className="hint">Already have an account? <a className="link" href="#/login">Login</a></p>
        <p className={`msg ${globalMsg.type}`}>{globalMsg.text}</p>
      </form>
    </AuthForm>
  );
}
