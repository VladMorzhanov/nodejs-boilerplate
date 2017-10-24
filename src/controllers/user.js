const UserService = require('../services/user-service')
const {SC, EC} = require('../constants')
const CustomError = require('../error/custom-error')

module.exports = {

  /**
   * Get user data by id
   * @param req - request object
   * @param res - response object
   * @param next - next handler object
   * @returns {Promise.<void>}
   */
  retrieve: async ({user}, res, next) => {
    try {
      // get user
      user = await UserService.getUser(user.id)
    } catch (e) {
      return next(e)
    }

    // check data
    if (!user) {
      return next(new CustomError('Data not found', EC.DATA_NOT_FOUND))
    }

    // remove user pwd
    user.password = undefined

    // send response
    res.status(SC.SUCCESS).json(user)
  },

  /**
   * Update user data by id
   * @param req - request object
   * @param res - response object
   * @param next - next handler object
   * @returns {Promise.<void>}
   */
  update: async (req, res, next) => {
    let {user, body} = req
    // check request user data
    if (!body.userData) {
      return next(new CustomError('Data not provided', EC.DATA_NOT_PROVIDED))
    }

    try {
      // load user data
      user = await UserService.editUser(user.id, body.userData)
    } catch (e) {
      return next(e)
    }

    // check data
    if (!user) {
      return next(new CustomError('Data not found', EC.DATA_NOT_FOUND))
    }

    // delete user password
    user.password = undefined

    // return information including token as JSON
    res.status(SC.SUCCESS).json(user)
  },

  /**
   * Delete user data by id
   * @param req - request object
   * @param res - response object
   * @param next - next handler object
   * @returns {Promise.<void>}
   */
  delete: async ({user}, res, next) => {
    try {
      // delete user
      await UserService.deleteUser(user.id)
    } catch (e) {
      return next(e)
    }

    // send response
    res.status(SC.SUCCESS).send()
  }
}
