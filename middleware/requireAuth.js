const keys = require('../config/keys.config')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const requireAuth = async (req, res, next) => {
  try {
    const auth = req.get('authorization')

    if(!auth) return res.status(401).json({ error: "Unauthorized" })
  
    const token = auth.replace('Bearer ', '')
  
    let dataFromToken = jwt.verify(token, keys.jwt.secret)
  
    const user = await User.findOne({ _id: dataFromToken.id })
  
    if(!user) return res.status(401).json({ error: "Unauthorized" })
  
    req.user = user
  
    next()
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" })
  }
}

module.exports = requireAuth