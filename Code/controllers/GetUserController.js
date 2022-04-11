const createModelForName = require("../models/HospitalModel");
const UserModel = require("../models/UsersModel");

// localhost:9090/getUser?NRIC=<hospital
const getUser = async (req, res) => {
  // Retrieve hospital and name
  try {
    let { NRIC } = req.query;

    // If no query params provided, return error
    if (!NRIC) {
      return res
        .status(400)
        .json({ success: false, reason: "Missing hospital params" });
    }

    // Find the name and hospital of user
    NRIC = NRIC.toUpperCase();
    const { name, hospital, queueNum } = await UserModel.findOne({ NRIC: NRIC })
      .select("name hospital queueNum")
      .exec();

    // Find the number of people ahead in queue
    hospitalModel = createModelForName(hospital);
    const { time } = await hospitalModel
      .findOne({ NRIC: NRIC })
      .select("time")
      .exec();

    const count = await hospitalModel
      .find({ time: { $lt: time } })
      .sort({ time: 1 })
      .count()
      .exec();

    // Send back response including the name, hospital and number of people ahead
    res.status(200).send({
      success: true,
      name: name,
      hospital: hospital,
      numAhead: count,
      queueNum: queueNum,
    });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = getUser;
