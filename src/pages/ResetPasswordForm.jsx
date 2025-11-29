import React, { useEffect, useMemo, useState } from 'react';
import AuthForm from './AuthForm.jsx';
import AuthService from '../services/authService.js';
import { validatePassword, validateConfirm } from '../utils/validators.js';

function useQuery() {
  const raw = window.location.hash.split('?')[1] || '';
  return new URLSearchParams(raw);
}

export default function ResetPasswordForm() {
  const qs = useQuery();
  const email = qs.get('email') || '';
  const token = qs.get('token') || '';
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [cfMsg, setCfMsg] = useState('');
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' });
  const tokenValid = !!email && !!token;

  useEffect(() => setPwMsg(validatePassword(pw)), [pw]);
  useEffect(() => setCfMsg(validateConfirm(pw, cf)), [pw, cf]);
  const disabled = useMemo(() => !tokenValid || !!(pwMsg || cfMsg), [tokenValid, pwMsg, cfMsg]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalMsg({ text: '', type: '' });
    try {
      await AuthService.resetPassword({ email, token, newPassword: pw });
      setGlobalMsg({ text: 'Password updated. Please login.', type: 'success' });
      setTimeout(() => (window.location.hash = '#/login'), 700);
    } catch (err) {
      setGlobalMsg({ text: err?.data?.message || 'Reset failed', type: 'error' });
    }
  }

  return (
    <AuthForm title="Set a new password">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <div className="label"><span className="icon">🔒</span><span>New password</span></div>
          <div className="input-wrap">
            <input className="input" type="password" placeholder="Min 8 chars, A-Z, 0-9" value={pw} onChange={(e) => setPw(e.target.value)} aria-describedby="resetPasswordMsg" aria-required="true" />
          </div>
          <p id="resetPasswordMsg" className={`msg ${pwMsg ? 'error' : ''}`}>{pwMsg}</p>
        </div>

        <div className="form-group">
          <div className="label"><span className="icon">✅</span><span>Confirm password</span></div>
          <div className="input-wrap">
            <input className="input" type="password" placeholder="Repeat password" value={cf} onChange={(e) => setCf(e.target.value)} aria-describedby="resetConfirmMsg" aria-required="true" />
          </div>
          <p id="resetConfirmMsg" className={`msg ${cfMsg ? 'error' : ''}`}>{cfMsg}</p>
        </div>

        <button className="btn" type="submit" disabled={disabled}>Update password</button>
        <p className="hint"><a className="link" href="#/login">Back to login</a></p>
        {!tokenValid && <p className="msg error">Invalid or missing token.</p>}
        <p className={`msg ${globalMsg.type}`}>{globalMsg.text}</p>
      </form>
    </AuthForm>
  );
}
