export default err => {
  const error = {};
  const { details } = err;
  details.forEach(element => {
    const { message, path } = element;
    error[path[0]] = message.replace(/['"]+/g, "");
  });
  return error;
};
