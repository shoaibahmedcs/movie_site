import React from 'react';

export default function TokenWarning() {
  return (
    <div className="token-warning">
      <span className="warning-icon">⚠️</span>
      <p className="warning-text">Invalid or missing token. Please request a new password reset link.</p>
    </div>
  );
}
