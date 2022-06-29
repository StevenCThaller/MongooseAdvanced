const userRoutes = require('./user.routes')
const activityRoutes = require('./socialActivity.routes')
const authRoutes = require('./auth.routes')
const router = require('express').Router()


router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/activities', activityRoutes)

module.exports = router
