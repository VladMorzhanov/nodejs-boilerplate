const User = require("../models/User");
const { SECRET, ERROR_CODES } = require("../constants");
const jwt = require("jsonwebtoken");
const CustomError = require("../error/custom-error");

/**
 * getUser user data by id
 * @param id - user id
 * @throws {Error} error
 * @returns {Promise.<*>} user data
 */
async function getUser(id) {
  const user = await User.findById(id);

  // hide user password
  user.password = undefined;

  return user;
}

/**
 * Edit user data
 * @param id user id
 * @param data user data t update
 * @throws {Error} error
 * @returns {Promise.<void>}
 */
async function editUser(id, data) {
  let user = await User.findById(id);

  data.email = undefined;
  data.password = undefined;
  data.token = undefined;
  data.name = data.name.trim();

  // update the users info only if it's new
  for (let k in data) {
    if (data.hasOwnProperty(k)) {
      if (data[k]) {
        user[k] = data[k];
      }
    }
  }

  // create new token
  user.token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    SECRET,
    {
      expiresIn: "30d" // expires in 30 days
    }
  );

  // save user
  user = await user.save();

  if (!user) {
    throw new CustomError("User not saved.", ERROR_CODES.DATA_NOT_SAVED);
  }

  return user;
}

/**
 * delete user
 * @param id - user id
 * @throws {Error} error
 * @returns is user deleted
 */
async function deleteUser(id) {
  if (!id) {
    throw new CustomError("Data not provided.", ERROR_CODES.DATA_NOT_PROVIDED);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("User not found.", ERROR_CODES.DATA_NOT_SAVED);
  }

  // delete user
  await user.remove();
}

/**
 * create new token for user
 * @param user - user object
 * @throws {Error} error
 * @returns {Promise.<*>} user data
 */
async function createNewToken(user) {
  user.token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    SECRET,
    {
      expiresIn: "30d"
    }
  );

  user = await user.save();

  if (!user) {
    throw new CustomError("User not saved.", ERROR_CODES.DATA_NOT_SAVED);
  }

  return user;
}

module.exports = {
  getUser,
  editUser,
  deleteUser
};
