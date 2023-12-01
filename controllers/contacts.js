const contactsPath = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
    const allContacts = await contactsPath.listContacts();
    res.json(allContacts);
};

const oneContact = async (req, res) => {
    const { id } = req.params;
    const oneContact = await contactsPath.getContactById(id);
    if (!oneContact) {
      throw HttpError(404, "Not found");
    }
    res.json(oneContact);
};

const newContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await contactsPath.addContact({ name, email, phone });
    res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const removeContact = await contactsPath.removeContact(id);
    if (!removeContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
};

const updatedContact = async (req, res) => {
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
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  oneContact: ctrlWrapper(oneContact),
  newContact: ctrlWrapper(newContact),
  removeContact: ctrlWrapper(removeContact),
  updatedContact: ctrlWrapper(updatedContact),
};