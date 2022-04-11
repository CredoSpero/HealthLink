const router = require("express").Router();
const checkUser = require("../controllers/CheckUserController");

router.get("/", checkUser);

module.exports = router;
