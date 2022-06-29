const { getActivities, createActivity, getActivityDetails, deleteActivity, attendActivity, getActivitiesByCity } = require('../controllers/socialActivity.controller')
const requireAuth = require('../middleware/requireAuth')

const router = require('express').Router()

router.route('/')
  .get(getActivities)
  .post(requireAuth, createActivity)

router.route('/:activityId')
  .get(getActivityDetails)
  .delete(requireAuth, deleteActivity)
router.route('/:activityId/attend')
  .get(requireAuth, attendActivity)

router.get('/location/:city', getActivitiesByCity)


module.exports = router