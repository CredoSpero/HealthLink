const router = require("express").Router();
const removeUser = require("../controllers/RemoveUserController");

router.delete("/", removeUser);

module.exports = router;
