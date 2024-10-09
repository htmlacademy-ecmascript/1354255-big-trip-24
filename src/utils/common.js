const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const updateItem = (items, updatedItem, updatedItemIndex) => ([
  ...items.slice(0, updatedItemIndex),
  updatedItem,
  ...items.slice(updatedItemIndex + 1),
]);

const deleteItem = (items, deletedIndex) => ([
  ...items.slice(0, deletedIndex),
  ...items.slice(deletedIndex + 1),
]);

export {
  capitalizeFirstLetter,
  deleteItem,
  updateItem
};
