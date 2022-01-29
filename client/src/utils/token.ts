/**
 * Helpers function which return
 * token stored in LocalStorage
 * @returns
 */
export const getToken = (): string => {
  return localStorage.getItem('token');
};

/**
 * Remove token from LS
 */

export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * This function help to set Token inside localStorage
 * @param token
 */
export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};
