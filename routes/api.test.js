let path = require('path')
let exec = require('mz/child_process').exec
let axios = require('axios')

describe('api', () => {
  beforeAll(async (done) => {
    try {
      await exec('pm2 kill all')
    } catch (e) {}

    await new Promise(resolve => setTimeout(resolve, 1000))

    await exec('pm2 restart pm2.dev.config.js', {cwd: path.resolve(__dirname, '..')})
    await new Promise(resolve => setTimeout(resolve, 1000))

    done()
  }, 5 * 1000)

  test('post empty phone value', async () => {
    const payload = {
      phone: ''
    }
    try {
      await axios.post('http://localhost:3333/api/sms-promotion', payload)
    } catch (err) {
      expect(err.response.status).toEqual(500)
    }
  })

  test('post invalid phone value', async () => {
    const payload = {
      phone: '+357977777'
    }
    try {
      await axios.post('http://localhost:3333/api/sms-promotion', payload)
    } catch (err) {
      expect(err.response.status).toEqual(500)
      expect(err.response.data.message).toEqual("Invalid phone number!")
      expect(err.response.data.title).toEqual("error")
    }
  })

  test('post phone value and send SMS', async () => {
    const payload = {
      phone: '+35796891296'
    }
    try {
      const response = await axios.post('http://localhost:3333/api/sms-promotion', payload)
      expect(err.response.status).toEqual(200)
      expect(err.response.data.message).toEqual("Promo code should arrive shortly!")
      expect(err.response.data.title).toEqual("success")
    } catch (err) {}
  })

})
