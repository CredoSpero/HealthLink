const router = require("express").Router();
const getUser = require("../controllers/GetUserController");

router.get("/", getUser);

module.exports = router;
