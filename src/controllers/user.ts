const UserService = require("../services/user-service");
const { STATUS_CODES, ERROR_CODES } = require("../constants");
const CustomError = require("../error/custom-error");

module.exports = {
  retrieve: async ({ user }, res, next) => {
    try {
      user = await UserService.getUser(user.id);
    } catch (e) {
      return next(e);
    }

    if (!user) {
      return next(
        new CustomError("Data not found", ERROR_CODES.DATA_NOT_FOUND)
      );
    }

    user.password = undefined;

    res.status(STATUS_CODES.SUCCESS).json(user);
  },

  update: async (req, res, next) => {
    let { user, body } = req;
    if (!body.userData) {
      return next(
        new CustomError("Data not provided", ERROR_CODES.DATA_NOT_PROVIDED)
      );
    }

    try {
      user = await UserService.editUser(user.id, body.userData);
    } catch (e) {
      return next(e);
    }

    if (!user) {
      return next(
        new CustomError("Data not found", ERROR_CODES.DATA_NOT_FOUND)
      );
    }

    user.password = undefined;

    res.status(STATUS_CODES.SUCCESS).json(user);
  },

  delete: async ({ user }, res, next) => {
    try {
      await UserService.deleteUser(user.id);
    } catch (e) {
      return next(e);
    }

    res.status(STATUS_CODES.SUCCESS).send();
  }
};
