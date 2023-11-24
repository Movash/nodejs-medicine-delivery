const express = require('express')
const Joi = require("joi")

const contactsPath = require('../../models/contacts')

const {HttpError} = require("../../helpers")

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contactsPath.listContacts();
    res.json(allContacts);
  }
  catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneContact = await contactsPath.getContactById(id);
    if (!oneContact) {
      throw HttpError (404, "Not found");
    }
    res.json(oneContact);
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const { name, email, phone } = req.body;
    const newContact = await contactsPath.addContact({ name, email, phone });
    res.status(201).json(newContact);
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const removeContact = await contactsPath.removeContact(id);
    if (!removeContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted"
    });
  }
  catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await contactsPath.updateContact(id, {
      name,
      email,
      phone,
    });
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  }
  catch (error) {
    next(error);
  }
})

module.exports = router
