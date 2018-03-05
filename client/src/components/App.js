import React, { Component } from 'react'
import * as axios from 'axios'
import Phone, {
  isValidPhoneNumber
} from 'react-phone-number-input'

import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'
import './App.css'

class App extends Component {
  state = {
    phone: '',
    over18: false,
    acceptTermsAndConditions: false,
    responseMessage: ''
  }

  handleChange (field, event, value) {
    switch (field) {
      case 'acceptTermsAndConditions':
      case 'over18':
        this.setState({
          [field]: !this.state[field]
        })
        break
      case 'phone':
        this.setState({
          [field]: value
        })
        break
      default:
      //
    }
  }

  valid () {
    return isValidPhoneNumber(this.state.phone) && this.state.over18 && this.state.acceptTermsAndConditions
  }

  async handleSubmit (event) {
    event.preventDefault()

    try {
      const response = await axios.post('/api/sms-promotion', {phone: this.state.phone})
      this.setState({
        responseMessage: response.data.message
      })
    } catch (err) {
      this.setState({
        responseMessage: err.response.data.message
      })
    }
  }

  render () {
    const {phone, responseMessage, over18, acceptTermsAndConditions} = this.state

    return (
      <div className="container">
        <div className="form-container">
          <form onSubmit={this.handleSubmit.bind(this)}>

            <div className="fields">
              <Phone
                className="phone-placeholder"
                placeholder="Enter phone number"
                value={this.state.phone}
                onChange={(phone, event) => this.handleChange('phone', event, phone)}
                error={phone && isValidPhoneNumber(phone) ? undefined : 'Invalid phone number'}
                indicateInvalid={true}/>

              <div className="field">
                <input type="checkbox"
                       id="over18"
                       defaultChecked={over18}
                       onChange={event => this.handleChange('over18', event)}/>
                <label htmlFor="over18">I am over 18</label>
              </div>

              <div className="field">
                <input type="checkbox"
                       id="termsAndConditions"
                       defaultChecked={acceptTermsAndConditions}
                       onChange={event => this.handleChange('acceptTermsAndConditions', event)}/>
                <label htmlFor="termsAndConditions">I accept the terms and conditions</label>
              </div>

            </div>
            <button
              type="submit"
              className="promo-btn"
              disabled={!this.valid()}>
              Get promo code
            </button>

          </form>
        </div>
        {
          responseMessage
            ? <p>{responseMessage}</p>
            : ''
        }
      </div>
    )
  }
}

export default App
