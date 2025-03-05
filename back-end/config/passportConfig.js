const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function(email, password, cb) {
    try {
      //Example user to test login, ensure email and password match
      const user = {"id": 1, "firstName": "Charles", "lastName": "Richardson", "email": "test@test.com", "password": "test"};

      const emailMatch = email == user.email;
      if (!emailMatch) return cb(null, false, { message: "User not found" });

      //Using example password and checks against test password
      const isMatch = password == user.password
      if (!isMatch) return cb(null, false, { message: "Invalid credentials" });

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);

//stores the id of user into the session
passport.serializeUser( function(user, cb) {
  cb(null, user) //stores user id and their username, if we use usernames for admins, as an object in session
});

//get user info from database using the stored user id
passport.deserializeUser( function(user, cb) {//input variable would be appropriate for the data stored in session, this case is user
  cb(null, user); //gives user object
});

module.exports = passport;