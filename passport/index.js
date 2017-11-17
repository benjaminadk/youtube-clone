import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import keys from '../config/keys'

export const googleOauth = new GoogleStrategy(
    {
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'https://youtube-clone-benjaminadk.c9users.io:8081/auth/google/callback',
        passRequestToCallback: true
    }, 
        async (request, accessToken, refreshToken, profile, done) => {
            console.log(profile)
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
  res.redirect(`https://youtube-clone-benjaminadk.c9users.io`);
  }
  
