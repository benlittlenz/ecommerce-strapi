const CART_KEY = 'cart';
const TOKEN_KEY = 'jwt';

export const calcPrice = items => {
  return `$${items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}`;
};

export const setCart = (value, cartKey = CART_KEY) => {
  if (localStorage) {
    localStorage.setItem(cartKey, JSON.stringify(value));
  }
};

export const getCart = (cartKey = CART_KEY) => {
  if (localStorage && localStorage.getItem(cartKey)) {
    return JSON.parse(localStorage.getItem(cartKey));
  }
  return [];
};

export const clearCart = (cartKey = CART_KEY) => {
    if(localStorage) {
        localStorage.removeItem(cartKey);
    }
}

export const getToken = (tokenKey = TOKEN_KEY) => {
  if (localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
  return null;
};

export const setToken = (val, tokenKey = TOKEN_KEY) => {
  if (localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(val));
  }
};

export const clearToken = (token = TOKEN_KEY) => {
    if(localStorage) {
        localStorage.removeItem(token);
    }
}
