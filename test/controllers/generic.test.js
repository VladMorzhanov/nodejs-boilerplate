const app = require('../../src')
const request = require('supertest')
const {API_URI, SC, NODE_ENV} = require('../../src/constants')

describe('Generic controller', function () {
  describe('GET  /health-check', function () {
    it('should return 202', function (done) {
      if (NODE_ENV !== 'development') {
        throw new Error('This is production, no test available!')
      }
      request(app)
        .get(API_URI + '/health-check')
        .expect(SC.SUCCESS, done)
    })
  })
})
