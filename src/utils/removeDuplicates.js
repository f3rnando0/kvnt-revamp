export const removeDuplicates = (data) => {
  const newData = data.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      data.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
  return newData
};
