const User = require('../models/user.model')

module.exports = {
  getUserDetails: async (req, res) => {
    const { userId } = req.params 
    try {
      const user = await User
        .findOne({ _id: userId })
        .populate('activitiesHosted')
        .populate('activitiesAttending')

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}