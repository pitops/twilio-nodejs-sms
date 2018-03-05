const express = require('express')
const twilio = require('../lib/twilio')

const router = express.Router()

router.get('/', (req, res) => res.json({message: 'Hello'}))

router.post('/sms-promotion', async (req, res) => {
  if (!req.body.phone) {
    res.status(500)
  }

  const {phone} = req.body
  const hours = new Date().getHours()
  const isMorningTime = hours > 6 && hours < 12
  const message = isMorningTime
    ? 'Good morning! Your promocode is AM123'
    : 'Hello! Your promocode is PM456'

  try {
    const phoneLookup = await twilio
      .lookups
      .v1
      .phoneNumbers(phone)
      .fetch()
  } catch (err) {
    return res.status(500).json({ title: "error", message: "Invalid phone number!"})
  }

  try {
    const response = await twilio.messages.create({
      to: phone,
      from: process.env.TWILIO_SENDER,
      body: message
    })
    return res.status(200).json({ title: "success", message: "Promo code should arrive shortly!"})
  } catch (err) {
    return res.status(500).json({ title: "error", message: "Uh oh! Something went wrong, please try again and if problem persists do not hesitate to contact us."})
  }
})

module.exports = router