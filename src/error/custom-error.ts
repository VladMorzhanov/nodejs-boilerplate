const { ERROR_CODES, STATUS_CODES } = require("../constants");

module.exports = function CustomError(message, ec) {
  let status;

  switch (ec) {
    case ERROR_CODES.SERVER_ERROR:
    case ERROR_CODES.DATA_NOT_SAVED:
      status = STATUS_CODES.SERVER_ERROR;
      break;
    case ERROR_CODES.DATA_NOT_PROVIDED:
    case ERROR_CODES.DATA_VALIDATION_FAILED:
    case ERROR_CODES.TRY_OTHER_AUTH:
    case ERROR_CODES.DATA_NOT_FOUND:
    case ERROR_CODES.USER_EXISTS:
    case ERROR_CODES.WRONG_PASSWORD:
    case ERROR_CODES.WRONG_EMAIL:
      status = STATUS_CODES.BAD_REQUEST;
      break;
    case ERROR_CODES.NOT_OUR_APP:
      status = STATUS_CODES.UNAUTHORIZED;
      break;
  }

  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.error_code = ec || ERROR_CODES.SERVER_ERROR;
  this.status = status || STATUS_CODES.SERVER_ERROR;
};

require("util").inherits(module.exports, Error);
