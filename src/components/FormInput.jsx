import React from 'react';

export default function FormInput({
  icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  message,
  messageId,
  required = true,
  disabled = false
}) {
  return (
    <div className="form-group">
      <div className="form-label">
        <span className="form-icon">{icon}</span>
        <span>{label}</span>
      </div>
      <div className={`form-input-wrap ${disabled ? 'disabled' : ''}`}>
        <input
          className="form-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-describedby={messageId}
          aria-required={required}
          disabled={disabled}
        />
      </div>
      <p id={messageId} className={`form-message ${message ? 'error' : ''}`}>
        {message}
      </p>
    </div>
  );
}
