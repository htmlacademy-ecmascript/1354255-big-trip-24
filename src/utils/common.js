const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const updateItem = (items, itemToUpdate) => items.map((item) => item.id === itemToUpdate.id ? itemToUpdate : item);

export {
  capitalizeFirstLetter,
  updateItem
};
