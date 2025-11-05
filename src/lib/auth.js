// Shared auth utilities
export function doLogout() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('isAuthenticated');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error clearing localStorage during logout:', err);
  }
}

export default doLogout;
