const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        const availableStates = [
          "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI",
          "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", 
          "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
          "OK", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "VI", 
          "WA", "WV", "WI", "WY"
        ]
        if(!availableStates.some((state) => state === val))
          return false
      },
      message: "Invalid state."
    }
  },
  zip: {
    type: String,
    minLength: 5,
    maxLength: 5
  }
})

module.exports = addressSchema