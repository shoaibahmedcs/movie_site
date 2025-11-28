import React from 'react';

export default function AuthForm({ title, children }) {
  return (
    <section className="card" aria-labelledby="form-title">
      <h1 id="form-title">{title}</h1>
      {children}
    </section>
  );
}
