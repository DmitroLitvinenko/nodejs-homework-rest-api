const express = require("express");

const ContactsController = require("../controllers/contacts");

const router = express.Router();

const jsonParser = express.json();

const { isValidId } = require("../middlewares/isValidId");

const validateBody = require("../middlewares/validateBody");

router.get("/", ContactsController.getContacts);

router.get("/:contactId", isValidId, ContactsController.getContact);

router.post("/", validateBody, jsonParser, ContactsController.createContact);

router.delete("/:contactId", isValidId, ContactsController.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody,
  jsonParser,
  ContactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  ContactsController.addToFavorite
);

module.exports = router;
