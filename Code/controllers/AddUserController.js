const createModelForName = require("../models/HospitalModel");
const UserModel = require("../models/UsersModel");

const addUser = async (req, res) => {
  try {
    // Add user to user collection
    const user = req.body;
    user.queueNum = queueNum;
    queueNum++;
    // console.log(user);
    const newUser = new UserModel(user);
    await newUser.save();

    // Add user to hospital collection
    const { NRIC, hospital } = user;
    const hospitalModel = createModelForName(hospital);
    const newHospital = new hospitalModel({ NRIC: NRIC });
    await newHospital.save();

    res.status(200).json({ success: true, data: user });
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
};

module.exports = addUser;
