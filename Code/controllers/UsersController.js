const UserModel = require("../models/UsersModel");

const findAll = (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const insertOne = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
};

module.exports = { findAll, insertOne };
