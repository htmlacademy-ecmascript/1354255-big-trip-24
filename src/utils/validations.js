const isValidPrice = (price) => !(/\D+/g.test(price));

export { isValidPrice };
