const express = require('express')

const ctrl = require("../../controllers/contacts")

const {validateBody} = require("../../middlewares")

const schemas = require("../../schemas/contacts")

const router = express.Router()

router.get('/', ctrl.allContacts)

router.get('/:id', ctrl.oneContact)

router.post('/', validateBody(schemas.addSchema), ctrl.newContact)

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updatedContact);

module.exports = router
