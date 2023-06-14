module.exports.fromBuffer = (buffer) => {
  const string = buffer.toString();
  return string ? JSON.parse(string) : string;
};
