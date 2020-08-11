const removeEmptyKeys = (obj) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] == null || newObj[key] === '') delete newObj[key];
  });
  return newObj;
};

module.exports = removeEmptyKeys;
