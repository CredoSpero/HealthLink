const createModelForName = require("../models/HospitalModel");
const UserModel = require("../models/UsersModel");

const removeUser = async (req, res) => {
  try {
    let { NRIC } = req.query;
    if (!NRIC) {
      return res
        .status(400)
        .json({ success: false, reason: "Missing NRIC Params" });
    }

    // Find the hospital of user
    NRIC = NRIC.toUpperCase();
    const { hospital } = await UserModel.findOne({ NRIC: NRIC }).exec();

    //Remove the user from the hospital database and user database
    hospitalModel = createModelForName(hospital);
    await hospitalModel.deleteOne({ NRIC: NRIC }).exec();
    await UserModel.deleteOne({ NRIC: NRIC }).exec();

    res.status(200).json({ success: true, NRIC: NRIC, hospital: hospital });
    console.log(`removed user ${NRIC} from ${hospital}`);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = removeUser;
