const { STATUS_CODES } = require("../constants");

module.exports = {
  healthCheck: (req, res) =>
    res.status(STATUS_CODES.SUCCESS).json({ success: true, message: "alive" }),
  genericGET: async ({ headers, query, params }, res, next) =>
    res.status(STATUS_CODES.SUCCESS).json(),
  genericPOST: async ({ headers, body, query, params }, res, next) =>
    res.status(STATUS_CODES.SUCCESS).json(),
  genericPUT: async ({ headers, body, query, params }, res, next) =>
    res.status(STATUS_CODES.SUCCESS).json(),
  genericDELETE: async ({ headers, query, params }, res, next) =>
    res.status(STATUS_CODES.SUCCESS).json()
};
