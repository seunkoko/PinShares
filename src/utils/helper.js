/* Get Token. */
export const getToken = () => localStorage.getItem('pinSharesAuthToken') || null;

/* Set Token. */
export const setToken = (token) => localStorage.setItem('pinSharesAuthToken', token);

/* Logout - Remove Token. */
export const logout = () => localStorage.removeItem('pinSharesAuthToken');
