const express = require("express");
const router = express.Router();
const Tenant = require("../database/entities/tenant");
const AppDataSource = require("../database/data-source");

router.get("/", async (req, res, next) => {
  try {
    const tenants = await AppDataSource.manager.find(Tenant);

    if (tenants.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(tenants);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
