const express = require("express");

const ctrl = require("../../controllers/drugstores");

const router = express.Router();

router.get("/", ctrl.allDrugstores);

module.exports = router;