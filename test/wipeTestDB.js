const User = require('../src/models/User')

module.exports = async () => {
  await User.remove()
}
