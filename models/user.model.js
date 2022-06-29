const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  activitiesHosted: [
    {
      type: ObjectId,
      ref: 'SocialActivity'
    }
  ],
  activitiesAttending: [
    {
      type: ObjectId,
      ref: 'SocialActivity'
    }
  ]
}, { timestamps: true })

userSchema.methods.toJSON = function() {
  const obj = this.toObject()

  delete obj.password
  delete obj.__v
  return obj
}

const User = mongoose.model('User', userSchema)

module.exports = User