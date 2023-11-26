const Contact = require("../models/contacts");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();

    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId).exec();

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const newContact = await Contact.create(contact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const updatedContact = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

async function addToFavorite(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;
    if (typeof favorite === "undefined") {
      res.status(400).json({ message: "Missing field favorite" });
    }
    const updateContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updateContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updateContact);
  } catch (error) {}
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  addToFavorite,
};
