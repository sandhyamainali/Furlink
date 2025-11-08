// Shared auth utilities
// Shared auth utilities
export function doLogout() {
  console.log('doLogout: Starting logout process');
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      console.log('doLogout: Removing tokens from localStorage');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('furlink_user');
      console.log('doLogout: Tokens removed successfully');
    }
  } catch (err) {
    console.error('Error clearing localStorage during logout:', err);
  }
}

export function logoutAndClearContext() {
  console.log('logoutAndClearContext: Starting logout and context clear');
  doLogout();
  // Dispatch a custom event to notify components to clear user state
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('userLogout'));
  }
}
export function doLogout() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('furlink_user');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error clearing localStorage during logout:', err);
  }
}

export default doLogout;
