const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { UserProfile } = require('../models');

require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CallBackURL,
    passReqToCallback:true
  },
  async function(request,accessToken,refreshToken,profile,done){
    console.log("profile::::::::::::", profile)
    try {

           // Extract display name
         const displayName = profile.displayName || '';
    
         // Split display name into first and last name
         const nameParts = displayName.split(' ');
         const firstName = nameParts[0] || '';
         const lastName = nameParts.slice(1).join(' ') || '';
    
         console.log("Profile:", profile);
         console.log("First Name:", firstName);
         console.log("Last Name:", lastName);
    
        // Find or create user in the database
        let user = await UserProfile.findOne({ where: { email: profile.emails[0].value } });
        if (!user) {
          user = await UserProfile.create({
            UID: profile.id,
            email: profile.emails[0].value,
            firstName,
            lastName,
            is_email_verified: true,
            password: '', 
            status: 'ACTIVE' 
          });
        }
  
        return done(null, user);
      } catch (error) {
        console.error("Error in user profile creation:", error);
        return done(error, null);
      }
  
  }
));


  

  
passport.serializeUser((user, done) => {
    console.log("user:::::::::" ,user)
    done(null, user.id);
  });

passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserProfile.findByPk(id); 
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  
  module.exports = passport;