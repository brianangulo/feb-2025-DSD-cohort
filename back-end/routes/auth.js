const express = require("express");
const router = express.Router();
const passport = require("../config/passportConfig.js");
const bcrypt = require("bcryptjs");
const admin = require("../database/entities/admin");
const AppDataSource = require("../database/data-source");

router.post("/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info, status) => {
    if (err) return next(err);
    else {
      req.logIn(user, function () {
        return res.status(200).json({ user: user });
      });
    }
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  //If any fields are missing, for now throw a general error to error handling middleware in app.js. As a seperate later task we can add in a validation library.
  if (!firstName || !lastName || !email || !password) {
    return next(new Error("Missing required fields"));
  }

  try {
    const existingUser = await AppDataSource.manager.findOneBy(admin, {
      email,
    });

    if (existingUser) {
      return next(new Error("Email already taken. Please try again."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = AppDataSource.manager.create(admin, {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    });

    await AppDataSource.manager.save(admin, newUser);

    //Logs in the user with passport's req.logIn method.
    req.logIn(newUser, (err) => {
      if (err) return next(err);

      return res.status(200).json({ user: newUser });
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;