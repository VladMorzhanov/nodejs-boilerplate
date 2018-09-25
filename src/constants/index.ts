module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: 4000,
  API_URI: "/api",
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  SECRET: process.env.SECRET,
  STATUS_CODES: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVER_ERROR: 500
  },
  ERROR_CODES: {
    SERVER_ERROR: 0,
    NOT_OUR_APP: 1,
    DATA_NOT_PROVIDED: 2,
    TRY_OTHER_AUTH: 3,
    USER_EXISTS: 4,
    WRONG_PASSWORD: 5,
    WRONG_EMAIL: 6,
    DATA_VALIDATION_FAILED: 7,
    DATA_NOT_FOUND: 8,
    DATA_NOT_SAVED: 9
  },
  MIME_TYPES: {
    PNG: "image/png",
    JPEG: "image/jpeg",
    GIF: "image/gif",
    BMP: "image/bmp"
  }
};
