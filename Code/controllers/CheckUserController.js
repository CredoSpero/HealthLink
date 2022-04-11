const UserModel = require("../models/UsersModel");

// localhost:9090/checkUser?NRIC=<NRIC>
// return success=true if user exist in database else return success=false
const checkUser = async (req, res) => {
  try {
    let { NRIC } = req.query;

    // If no query params provided, return error
    if (!NRIC) {
      return res
        .status(400)
        .json({ success: false, reason: "Missing hospital params" });
    }

    const x = await UserModel.findOne({ NRIC: NRIC }).exec();

    if (x == null) {
      //User don't exist in database
      res.status(200).send({
        exist: false,
      });
    } else {
      res.status(200).send({
        exist: true,
      });
    }
  } catch (e) {
    res.status(404).json(e.message);
  }
};

module.exports = checkUser;
