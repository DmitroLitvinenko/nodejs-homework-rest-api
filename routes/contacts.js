const express = require("express");

const ContactsController = require("../controllers/contacts");

const router = express.Router();

const jsonParser = express.json();

const { isValidId } = require("../middlewares/isValidId");

const validateBody = require("../middlewares/validateBody");

router.get("/", ContactsController.getContacts);

router.get("/:contactId", ContactsController.getContact);

router.post("/", validateBody, jsonParser, ContactsController.createContact);

router.delete("/:contactId", ContactsController.deleteContact);

router.put(
  "/:contactId",
  jsonParser,
  isValidId,
  ContactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  ContactsController.addToFavorite
);

module.exports = router;
