const debounce = (callback, delay) => {
  let currentTimeout;

  return function (...args) {
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

export { debounce };
