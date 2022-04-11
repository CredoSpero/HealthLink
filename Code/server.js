require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const { setIntervalAsync } = require("set-interval-async/fixed");
const UsersRouter = require("./routes/UsersRoutes"); //TTTQueueRouter object is getting whatever tht is being exported from the module in TTTQueue.js. In this case, the router object/instance is being exported.
const AddUserRouter = require("./routes/AddUserRoutes");
const GetUserRouter = require("./routes/GetUserRoute");
const RemoveUserRouter = require("./routes/RemoveUserRoutes");
const CheckUserRouter = require("./routes/CheckUserRoutes");

const UserModel = require("./models/UsersModel");
const createModelForName = require("./models/HospitalModel");

// const deleteFirst = require("./Utilities/RemoveFirst");

const app = express();
const port = process.env.PORT || 5000;

global.queueNum = 1;

//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
//This middle ware mounted to all routes below it using: app.use(express.json());
// The req your express middleware receive is in json. So passing it through this middleware first will convert it
// from a json to an object. Then this object can be used in post request.
app.use(express.json());

//cors allows us to perform api call to the backend server from the front end directly
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"))
  );
}

//Connnection your mongoose object to your mongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MondoDB database connection established sucessfully");
});

// Formating the collection creating names. Default mongoose will add a "s" to the end of your collection name to make it plural
mongoose.pluralize(null);

//Import routes
app.use("/Users", UsersRouter); //middleware. everytime you go to localhost:9090/TTTQueue endpoints, use the TTTQueue.js file (export a router object) to handle
app.use("/addUser", AddUserRouter);
app.use("/getUser", GetUserRouter);
app.use("/removeUser", RemoveUserRouter);
app.use("/checkUser", CheckUserRouter);

// -------Deletion of 1 patient from all document every time period
// find all the hospital collection name
var colN;
connection.on("open", () => {
  connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      colN = names
        .filter((value) => {
          return value.name != "users";
        })
        .map((value, i) => {
          // console.log(value);
          return value.name;
        });
      console.log(`Hospitals with timely deletion of documents: ${colN}`);
    }
  });
});
// Function to do the deletion
async function deleteFirst() {
  // console.log(colN);
  if (colN) {
    try {
      for (var i = 0; i < colN.length; i++) {
        hosName = colN[i];
        hospitalModel = createModelForName(hosName);

        const doc = await hospitalModel
          .find()
          .sort({ time: 1 })
          .limit(1)
          .exec();

        // Hospital database is empty
        if (doc.length !== 0) {
          var NRIC = doc[0].NRIC;
          await hospitalModel.deleteOne({ NRIC: NRIC }).exec();
          await UserModel.deleteOne({ NRIC: NRIC }).exec();

          console.log(`removed user ${NRIC} from ${hosName}`);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}
// set time interval to every every x seconds. (Note the second argument is in millisecond, so 30 second interval is 30*1000ms)
// const timer = setIntervalAsync(deleteFirst, 30 * 1000);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// await connection.on("open", () =>{
// connection.db.listCollections().toArray(function (err, names) {
//   if (err) {
//     console.log(err);
//   } else {
//     var colN = names
//       .filter((value) => {
//         return value.name != "users";
//       })
//       .map((value, i) => {
//         // console.log(value);
//         return value.name;
//       });
//   }});
