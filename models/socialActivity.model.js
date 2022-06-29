const mongoose = require('mongoose')
const addressSchema = require('./address.model')
const { ObjectId } = mongoose.Schema.Types

const socialActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    validate: {
      validator: (val) => {
        const startTime = new Date(val)

        if(startTime < Date.now()) {
          return false;
        }
      },
      message: "Start time cannot be in the past."
    }
  },
  hostedBy: {
    type: ObjectId,
    ref: 'User'
  },
  attendees: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  address: {
    type: addressSchema
  }
}, { timestamps: true })

const SocialActivity = mongoose.model('SocialActivity', socialActivitySchema)

module.exports = SocialActivity