/**
 * Add Data to a List.
 * @param {string} list - List of Item you want to add item to.
 * @param {number} item - Item.
 * @param {Boolean} append - If you append to array set to true to prepend set to false.
 */

const addItemToList = ({ list, item, append }) => {
  if (!Array.isArray(list.slice())) {
    return [];
  }

  if (append) {
    return [...list, item];
  } else {
    return [item, ...list];
  }
};

/**
 * Remove Data to a List.
 * @param {string} list - List of Item you want to add item to.
 * @param {number} index - index at which element is that is to be removed.
 */

const removeItemFromList = ({ list, index }) => {
  if (!Array.isArray(list.slice())) {
    return [];
  }

  let newlist = list.slice();
  newlist.splice(index, 1);
  return newlist;
};

/**
 * Edit data from a List.
 * @param {string} list - List of Item you want to add item to.
 * @param {number} index - index at which element is that is to be removed.
 * @param {*} newItem - Anytype we want to enter to existing list Array
 */

const editDataFromList = ({ list, index, newItem }) => {
  if (!Array.isArray(list)) {
    return [];
  }
  return [...list.slice(0, index), ...newItem, ...list.slice(index + 1)];
};

export default {
  addItemToList,
  editDataFromList,
  removeItemFromList
};
