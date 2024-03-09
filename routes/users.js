const express = require("express");

const ctrl = require("../controllers/users");

const { validateBody } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.post("/", validateBody(schemas.addSchema), ctrl.newOrder);

module.exports = router;
