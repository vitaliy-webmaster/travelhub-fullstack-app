const removeEmptyKeys = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] == null || newObj[key] === '') delete newObj[key];
  });
  return newObj;
};

export default removeEmptyKeys;
