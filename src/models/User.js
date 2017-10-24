/**
 * User mongoose schema
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bnCrypt = require('bcrypt-nodejs')

// user schema
const User = new Schema(
  {
    // main
    name: {type: String, default: 'NaN'},
    email: {type: String, unique: true, default: 'NaN'},
    token: {type: String, required: true},
    dateCreated: {type: String, default: Date.now()},
  })

/**
 * hash password before user is saved
 */
User.pre('save', function (next) {
  const user = this

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next()

  if (user.name) {
    user.name = user.name.trim()
  }

  // generate the hash
  if (user.password !== 'NaN') {
    bnCrypt.hash(user.password, null, null, function (err, hash) {
      if (err) {
        throw new Error(err)
      }

      // change the password to the hashed version
      user.password = hash
      next()
    })
  } else {
    next()
  }
})

/**
 * middleware before user deleted
 */
User.pre('remove', function (next) {
  // do something when user deleted

  next()
})

/**
 * method to compare a given password with the database hash
 * @param password - password to hash
 * @returns {*}
 */
User.methods.comparePassword = function (password) {
  const user = this

  if (user.password === 'NaN') {
    return false
  }

  return bnCrypt.compareSync(password, user.password)
}

// return the model
module.exports = mongoose.model('User', User)
