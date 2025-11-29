export function getRememberEmail() {
  try {
    return localStorage.getItem('rememberEmail') || '';
  } catch {
    return '';
  }
}

export function setRememberEmail(email) {
  try {
    if (email) {
      localStorage.setItem('rememberEmail', email);
    } else {
      localStorage.removeItem('rememberEmail');
    }
  } catch {
    // Silent fail if localStorage is not available
  }
}

export function clearRememberEmail() {
  try {
    localStorage.removeItem('rememberEmail');
  } catch {
    // Silent fail if localStorage is not available
  }
}
