import React from 'react';

export default function FormMessage({ message }) {
  if (!message?.text) return null;

  return (
    <p className={`form-message form-message-global ${message.type}`}>
      {message.text}
    </p>
  );
}
