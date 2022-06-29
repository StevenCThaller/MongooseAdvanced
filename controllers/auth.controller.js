const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys.config')

module.exports = {
  signup: async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body

    try {
      const existingUser = await User.findOne({ username })

      if(existingUser) return res.status(422).json({ error: "Username taken." })

      if(!password) {
        return res.status(422).json({ error: "Password is required."})
      } else if(password.length < 8 || password.length > 32) {
        return res.status(422).json({ error: "Password must be between 8 and 32 characters." })
      } else if(password !== confirmPassword) {
        return res.status(422).json({ error: "Passwords must match" })
      }

      const hashedPassword = bcrypt.hashSync(password, 12)

      const newUser = await User.create({ firstName, lastName, username, password: hashedPassword })

      const token = jwt.sign({ username, id: newUser.id}, keys.jwt.secret)

      res.cookie('authCookie', token, { maxAge: 900000, httpOnly: true })

      res.status(200).json(newUser)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  signin: async (req, res) => {
    const { username, password } = req.body 

    try {
      const existingUser = await User.findOne({ username })

      if(!existingUser) return res.status(422).json({ error: "Invalid username or password." })

      const doPwMatch = bcrypt.compareSync(password, existingUser.password)

      if(!doPwMatch) return res.status(422).json({ error: "Invalid username or password." })

      const token = jwt.sign({ username, id: existingUser.id }, keys.jwt.secret)

      res.cookie('authCookie', token, { maxAge: 900000, httpOnly: true })

      res.status(200).json(existingUser)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}