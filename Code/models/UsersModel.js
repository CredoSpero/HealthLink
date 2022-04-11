const mongoose = require("mongoose");

//schema validation

// schema represents the structure of a particular document, either completely or just a portion sof the document.
// It's a way to express expected properties and values as well as constraints and indexes.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  NRIC: {
    type: String,
    required: true,
    uppercase: true,
    minLength: 9,
    maxlength: 9,
  },
  hospital: {
    type: String,
    required: true,
  },
  queueNum: {
    type: Number,
    required: true,
  },
});

// Creates a model which defines a programming interface for interacting with the database (read, insert, update, etc)
// Helps with querying database like "Are there any records matching this query?" or "Add a new document to the collection".
const UserModel = mongoose.model("Users", UserSchema); // params: Name of collection, schema used
module.exports = UserModel;
