const router = require("express").Router();
const addUser = require("../controllers/AddUserController");

router.post("/", addUser);

module.exports = router;
