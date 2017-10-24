const User = require('../../src/models/User')
// eslint-disable-next-line no-unused-vars
const app = require('../../src')
const UserService = require('../../src/services/user-service')
const jwt = require('jsonwebtoken')
const should = require('should')
const WipeDB = require('../wipeTestDB')
const {SALT, NODE_ENV} = require('../../src/constants')

describe('UserService Tests', function () {
  this.timeout(20000)

  let user

  before(async () => {
    if (NODE_ENV !== 'development') {
      throw new Error('This is production, no test available!')
    }

    await WipeDB()

    let userData = await User.create({
      email: 'email@email.com',
      password: '12345',
      token: 'NaN',
      test: true
    })

    userData.token = jwt.sign(
      {
        id: userData.id,
        email: userData.email
      }, SALT, {
        expiresIn: '30d'
      })

    user = await userData.save()
  })

  after(async () => {
    await WipeDB()
  })

  describe('UserService get user', () => {
    it('should return Error if user id not provided', async () => {
      await should(UserService.getUser()).be.rejected()
    })

    it('should return Error if user not found', async () => {
      await should(UserService.getUser('599357b8a4f9bb09a0e6f13c'))
        .be.rejected()
    })

    it('should return stats with appropriate user id',
      async () => {
        const userTest = await UserService.getUser(user._id)
        should(user._id + '').equal(userTest._id + '')
      })
  })

  describe('UserService edit user', () => {
    let userT = {}
    userT.name = 'updatedname'

    it('should return Error if user id not provided', async () => {
      await should(UserService.editUser(undefined, userT)).be.rejected()
    })

    it('should return Error if user data not provided', async () => {
      await should(UserService.editUser(user._id, undefined)).be.rejected()
    })

    it('should return Error if user not found', async () => {
      await should(UserService.editUser('599357b8a4f9bb09a0e6f13c', userT))
        .be.rejected()
    })

    it('should return user',
      async () => {
        const u = await UserService.editUser(user._id, userT)
        should(u).has.property('name').equal('updatedname')
      })
  })

  describe('UserService delete user', () => {
    it('should return Error if user id not provided', async () => {
      await should(UserService.deleteUser(undefined)).be.rejected()
    })
    it('should return Error if user not found', async () => {
      await should(UserService
        .deleteUser('599357b8a4f9bb09a0e6f13c')).be.rejected()
    })
    it('should return true if user deleted', async () => {
      await UserService.deleteUser(user._id)
    })
  })
})
