const express = require("express");

const ContactsController = require("../controllers/contacts");

const router = express.Router();

const jsonParser = express.json();

router.get("/", ContactsController.getContacts);

router.get("/:contactId", ContactsController.getContact);

router.post("/", jsonParser, ContactsController.createContact);

router.delete("/:contactId", ContactsController.deleteContact);

router.put("/:contactId", jsonParser, ContactsController.updateContact);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  ContactsController.addToFavorite
);

module.exports = router;
