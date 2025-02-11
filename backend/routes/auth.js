// const passport = require('passport');
// const { getDb } = require("../database/database.config");
// const { ObjectId } = require("mongodb");
// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// require('dotenv').config();
 
// passport.use(new GoogleStrategy({
//     clientID:     process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:4000/google/callback",
//     passReqToCallback   : true
//   },
//   async function(request, accessToken, refreshToken, profile, done) {
//     try{
//     let collection = await getDb().collection("Users");
//     let user = await collection.findOne({ googleId: profile.id });
//     if(!user)
//     {
//       const newUser = {
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails,
//         profilePhoto: profile.photos[0]?.value,
//         createdAt: new Date(),
//       };

//       const result = await collection.insertOne(newUser);
//       user = await collection.findOne({_id:result.insertId});
//     }

//       return done(null,profile);
//   } catch (err) {
//     return done(err, null);
//   }
//   }
// ));

// passport.serializeUser((user,done)=>{
//   return done(null,user);
// })

// passport.deserializeUser(async (obj,done)=>{
//   try
//   {
//     let collection = await getDb().collection("Users");
//     let user = await collection.findOne({ _id: obj._id });
//     done(null,user);
//   }
//   catch(e)
//   {
//     done(e,null);
//   }
// })
