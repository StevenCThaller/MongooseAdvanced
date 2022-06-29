const { getUserDetails } = require('../controllers/user.controller')
const router = require('express').Router()

router.route('/:userId')
  .get(getUserDetails)

module.exports = router