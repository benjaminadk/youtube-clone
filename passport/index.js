import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

export const googleOauth = new GoogleStrategy(
    {
        clientID: '',
        clientSecret: '',
        callbackURL: '',
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
    failureRedirect: '', 
    session: false 
})

export const googleRedirect = (req, res) => {
  res.redirect(``);
  }
  
