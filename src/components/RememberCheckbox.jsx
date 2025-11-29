import React from 'react';

export default function RememberCheckbox({ checked, onChange }) {
  return (
    <label className="form-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label="Remember me for future logins"
        className="checkbox-input"
      />
      <span className="checkbox-label">Remember me</span>
    </label>
  );
}
