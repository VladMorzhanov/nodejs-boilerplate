const { ERROR_CODES, STATUS_CODES } = require("../constants/index");

const errorHandler = () => {
  return (e, request, response, next) => {
    return response.status(e.status || STATUS_CODES.SERVER_ERROR).json({
      success: false,
      error_code: e.error_code || ERROR_CODES.SERVER_ERROR,
      error: e.message
    });
  };
};

module.exports = errorHandler;
