const mongoose = require("mongoose");

hospitalSchema = mongoose.Schema({
  NRIC: {
    type: String,
    required: true,
    uppercase: true,
    minLength: 9,
    maxlength: 9,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

// hospitalStr is the name of the hospital, preferably 2 digits
var establishedModels = {};
let createModelForName = (name) => {
  if (!(name in establishedModels)) {
    establishedModels[name] = mongoose.model(name, hospitalSchema);
  }
  return establishedModels[name];
};

module.exports = createModelForName;
