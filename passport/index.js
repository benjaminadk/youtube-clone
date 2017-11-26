import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import keys from '../config/keys'
import User from '../models/user'

var userId;

export const googleOauth = new GoogleStrategy(
    {
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'https://youtube-clone-benjaminadk.c9users.io:8081/auth/google/callback',
        passRequestToCallback: true
    }, 
        async (request, accessToken, refreshToken, profile, done) => {
            const googleId = profile.id
            const user = await User.findOne({ googleId })
            
            if(!user) {
                const newUser = new User({
                    googleId,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    imageUrl: profile.photos[0].value
                })
                const savedUser = await newUser.save()
                
                userId = savedUser._id
                
                const token = jwt.sign({
                    id: savedUser._id
                }, keys.jwtSecret, { expiresIn: '7d' })
                savedUser.jwt = token
                await savedUser.save()
                done(null, {})
            }
            
            userId = user._id
            const newToken = jwt.sign({
                id: user._id,
                fcm: user.fcmToken
            }, keys.jwtSecret, { expiresIn: '7d' })
            user.jwt = newToken
            await user.save()
            done(null, {})
        }
)

export const googleScope = passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/plus.login',
  	  'https://www.googleapis.com/auth/plus.profile.emails.read' ]})
  	  
export const googleCallback = passport.authenticate('google', { 
    failureRedirect: 'https://youtube-clone-benjaminadk.c9users.io', 
    session: false 
})

export const googleRedirect = (req, res) => {
  res.redirect(`https://youtube-clone-benjaminadk.c9users.io/user/${userId}`);
  }
  
