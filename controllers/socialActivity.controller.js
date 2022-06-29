const SocialActivity = require("../models/socialActivity.model")

module.exports = {
  getActivities: async (req, res) => {
    try {
      const allActivities = await SocialActivity.find()

      res.status(200).json(allActivities)
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" })
    }
  },
  createActivity: async (req, res) => {
    const { title, description, startTime, address, address2, city, state, zip } = req.body 

    try {
      const newActivity = await SocialActivity.create({ 
        title, 
        description, 
        startTime,
        address: {
          address,
          address2, 
          city,
          state,
          zip
        },
        hostedBy: req.user
      })
      
      req.user.activitiesHosted = [...req.user.activitiesHosted, newActivity.id]
      
      await req.user.save()

      res.status(200).json(newActivity)      
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getActivityDetails: async (req, res) => {
    const { activityId } = req.params 
    try {
      const activity = await SocialActivity
        .findOne({ _id: activityId })
        .populate('hostedBy')
        .populate('attendees')

      res.status(200).json(activity)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  deleteActivity: async (req, res) => {
    const { activityId } = req.params 
    try {
      const possibleActivity = await SocialActivity.findOne({ _id: activityId, hostedBy: req.user })

      if(!possibleActivity) return res.status(401).json({ error: "Unauthorized" })

      const activityToDelete = await SocialActivity.findOneAndDelete({ _id: activityId })

      res.status(200).json(activityToDelete)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  attendActivity: async (req, res) => {
    const { activityId } = req.params

    try {
      const activityToAttend = await SocialActivity.findOne({ _id: activityId })

      // add logged in user to activity's attendee list
      activityToAttend.attendees.push(req.user)
      // add activity to logged in user's list of activities attending
      req.user.activitiesAttending.push(activityToAttend)

      // save both
      await activityToAttend.save()
      await req.user.save()

      res.status(200).json({ message: "Success" })
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getActivitiesByCity: async (req, res) => {
    const { city } = req.params

    try {
      const activitiesInCity = await SocialActivity.find({ "address.city": {
        $regex: city,
        $options: "i"
      } })

      res.status(200).json(activitiesInCity)
    } catch (error) {
      res.status(500).json(error)      
    }
  }
}
