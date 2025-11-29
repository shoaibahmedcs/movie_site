export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return '';
}

export function validateEmail(email) {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email';
  }
  return '';
}

export function validatePassword(password) {
  if (!password || password.length === 0) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return '';
}

export function validateConfirm(password, confirm) {
  if (!confirm || confirm.length === 0) {
    return 'Please confirm your password';
  }
  if (password !== confirm) {
    return 'Passwords do not match';
  }
  return '';
}
