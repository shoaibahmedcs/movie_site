import React, { useEffect, useMemo, useState } from 'react';
import AuthForm from './AuthForm.jsx';
import AuthService from '../Services/authService.js';
import { validateEmail } from '../utils/validators.js';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });

  useEffect(() => setEmailMsg(validateEmail(email)), [email]);
  const disabled = useMemo(() => !!emailMsg, [emailMsg]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    try {
      await AuthService.requestReset({ email: email.trim() });
      setGlobalMsg({ text: 'If account exists, reset email sent.', type: 'success' });
    } catch (err) {
      setGlobalMsg({ text: err?.data?.message || 'Failed to send reset', type: 'error' });
    }
  }

  return (
    <AuthForm title="Reset your password">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <div className="label"><span className="icon">@</span><span>Email</span></div>
          <div className="input-wrap">
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="forgotEmailMsg" aria-required="true" />
          </div>
          <p id="forgotEmailMsg" className={`msg ${emailMsg ? 'error' : ''}`}>{emailMsg}</p>
        </div>

        <button className="btn" type="submit" disabled={disabled}>Send reset link</button>
        <p className="hint"><a className="link" href="#/login">Back to login</a></p>
        <p className={`msg ${globalMsg.type}`}>{globalMsg.text}</p>
      </form>
    </AuthForm>
  );
}
