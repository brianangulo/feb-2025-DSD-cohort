const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  return next(new Error("Unauthorized"));
});

module.exports = router;
