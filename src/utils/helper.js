export const getToken = () => localStorage.getItem('pinSharesAuthToken') || null;

export const setToken = (token) => localStorage.setItem('pinSharesAuthToken', token);

export const logout = () => localStorage.removeItem('pinSharesAuthToken');
