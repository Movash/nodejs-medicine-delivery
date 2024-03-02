const express = require("express");

const ctrl = require("../../controllers/drugstores");

// const {
//   validateBody,
//   validateFavorite,
//   isValidId,
// } = require("../../middlewares");

// const { schemas } = require("../../models/drugstore");

const router = express.Router();

router.get("/", ctrl.allDrugstores);

module.exports = router;