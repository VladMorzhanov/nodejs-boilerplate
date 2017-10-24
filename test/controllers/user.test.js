const User = require('../../src/models/User')
const app = require('../../src')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const should = require('should')
const WipeDB = require('../wipeTestDB')
const {API_URI, SALT, NODE_ENV} = require('../../src/constants')

describe('User controller', function () {
  this.timeout(20000)

  let user
  let password = '12345'

  before(async () => {
    if (NODE_ENV !== 'development') {
      throw new Error('This is production, no test available!')
    }

    await WipeDB()

    let userData = await User.create({
      email: 'email@email.com',
      password: password,
      token: 'NaN'
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

  describe('GET /user', () => {
    it('should return 401 if token not provided', (done) => {
      request(app)
        .get(API_URI + '/user')
        .expect(401, done)
    })

    it('should return 200 if user data retrieved', (done) => {
      request(app)
        .get(API_URI + '/user')
        .set('x-token', user.token)
        .expect(200)
        .end(function (err, res) {
          should(res.body).has.property('email')
          should(res.body).has.property('name')
          should(res.body).has.property('token')
          done(err)
        })
    })
  })

  describe('PUT /user', () => {
    it('should return 401 if token not provided', (done) => {
      request(app)
        .put(API_URI + '/user')
        .expect(401, done)
    })

    it('should return 400 if user data not provided', (done) => {
      request(app)
        .put(API_URI + '/user')
        .set('x-token', user.token)
        .expect(400, done)
    })

    it('should return 200 if user updated', (done) => {
      user.name = 'updatedname'

      request(app)
        .put(API_URI + '/user')
        .set('x-token', user.token)
        .send({userData: user})
        .expect(200)
        .end(function (err, res) {
          should(res.body).has.property('name').and.equal('updatedname')
          done(err)
        })
    })
  })

  describe('DELETE /user', function () {
    it('should return 401 if token not provided', function (done) {
      request(app)
        .delete(API_URI + '/user')
        .expect(401, done)
    })

    it('should return 200 if user deleted', function (done) {
      request(app)
        .delete(API_URI + '/user')
        .set('x-token', user.token)
        .expect(200, done)
    })
  })
})
