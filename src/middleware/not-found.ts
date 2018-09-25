const notFound = message => {
  return (_, response) => response.status(404).json(message);
};

module.exports = notFound;
