const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const jwt = require('jsonwebtoken')
const keys = require('../config')
const models = require('../models')

var userId

const googleOauth = new GoogleStrategy(
  {
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: key.googleCallback,
    passRequestToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const googleId = profile.id
    const user = await models.User.findOne({ googleId })

    if (!user) {
      const newUser = new models.User({
        googleId,
        username: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value
      })
      const savedUser = await newUser.save()

      userId = savedUser._id

      const token = jwt.sign(
        {
          id: savedUser._id,
          username: savedUser.username
        },
        keys.jwtSecret,
        { expiresIn: '30d' }
      )
      savedUser.jwt = token
      await savedUser.save()
      done(null, {})
    }

    userId = user._id
    const newToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        fcm: user.fcmToken
      },
      keys.jwtSecret,
      { expiresIn: '30d' }
    )
    user.jwt = newToken
    await user.save()
    done(null, {})
  }
)

const googleScope = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
})

const googleCallback = passport.authenticate('google', {
  failureRedirect: keys.googleFailureRedirect,
  session: false
})

const googleRedirect = (req, res) => {
  res.redirect(`${keys.googleRedirect}${userId}`)
}

module.exports = {
  googleOauth,
  googleScope,
  googleCallback,
  googleRedirect
}
