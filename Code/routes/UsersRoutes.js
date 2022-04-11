const router = require("express").Router();
// const UserModel = require("../models/UsersModel");
const { findAll, insertOne } = require("../controllers/UsersController");

// user.create, user.save is an asynchronous function which returns promises (Can use async/await)
// user.where().gt().lt().where().equals() read as find the property where _ greater than annd less than and also where __ equals
// select allows us to select which property we get

// router
//   .route("/")
//   .get((req, res) => {
//     UserModel.find({}, (err, result) => {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(result);
//       }
//     });
//   })
//   .post(async (req, res) => {
//     const user = req.body;
//     const newUser = new UserModel(user);
//     await newUser.save();

//     res.json(user);
//   });

router.get("/", findAll);

router.post("/", insertOne);

module.exports = router;
