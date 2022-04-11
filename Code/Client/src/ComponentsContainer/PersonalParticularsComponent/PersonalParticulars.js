import "./PersonalParticulars.css";
import React, { useState } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function QueueInfo(props) {
  const [name, setName] = useState("");
  const [NRIC, setNRIC] = useState("");

  const location = useLocation();
  const hospitalName = location.state;

  // e is the event object
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleNRIC = (e) => {
    setNRIC(e.target.value);
  };

  // const hospitalSetNRIC = (newHospital) => {
  //   return new Promise((resolve, reject) =>
  //     setHospital(newHospital, () => {
  //       resolve();
  //     })
  //   );
  // };

  const history = useHistory();

  const validInput = () => {
    // Ensrue the field is not empty
    if (NRIC == "" && name == "") {
      toast.error("Name and NRIC is required!");
      return 0;
    }
    if (NRIC == "") {
      toast.error("NRIC is required!");
      return 0;
    }
    if (name == "") {
      toast.error("Name is required!");
      return 0;
    }

    // Check name is valid
    // No special character. Characters and spaces only
    const nameRegex = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
    if (!nameRegex.test(name)) {
      toast.error("Invalid Name. Check again!");
      return 0;
    }

    // Check NRIC is valid
    // Singapore NRIC standard, S/T/F/G followed by 7 numbers followed by A-Z
    const NRICRegex = /^[STFG]\d{7}[A-Z]$/;
    if (!NRICRegex.test(NRIC.toUpperCase())) {
      toast.error("Invalid NRIC. Check again!");
      return 0;
    }

    return 1;
  };

  let submitForm = async (e) => {
    e.preventDefault(); //prevent page from re-rendering

    if (!validInput()) {
      return;
    }

    try {
      let data = {
        name,
        NRIC,
        hospital: hospitalName,
      };

      // Check if user is in database. If user is not in database, throw error
      const userRes = await Axios.get(
        `https://sswwee.herokuapp.com/checkUser?NRIC=${NRIC}`
      );
      if (userRes.data.exist === true) {
        toast.error("User is already in queue.");
        return;
      }

      const res = await Axios.post(
        `https://sswwee.herokuapp.com/addUser`,
        data
      );
      const getRes = await Axios.get(
        `https://sswwee.herokuapp.com/getUser?NRIC=${NRIC}`
      );
      const info = getRes.data;
      const hospital = info.hospital;
      const ahead = info.numAhead.toString();
      const queue = info.queueNum.toString();
      let pushData = {
        name,
        hospital,
        ahead,
        queue,
        NRIC,
      };
      // console.log(pushData);

      history.push({
        pathname: "/QueueInfo",
        state: pushData,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error. Check Server log");
    }
  };

  return (
    <div>
      <div className="PersonalParticularsRectangle">
        <div className="PersonalParticularsHospitalName">
          <h1>{hospitalName}</h1>
        </div>
        <div className="PersonalParticularsHead">
          <h1>Personal Particulars</h1>
        </div>
        <form onSubmit={submitForm}>
          <div className="PersonalParticularsNameNRIC">
            <label htmlFor="Name">Name</label>
            <br></br>
            <input
              className="PersonalParticularsInputBox"
              type="text"
              id="Name"
              onChange={handleName}
              value={name}
              placeholder="Name"
            />
            <br></br>
            <br></br>
            <label htmlFor="NRIC">NRIC</label>
            <br></br>
            <input
              className="PersonalParticularsInputBox"
              type="text"
              id="NRIC"
              onChange={handleNRIC}
              value={NRIC}
              placeholder="NRIC"
            ></input>
            <br></br>
          </div>
          <div className="PersonalParticularsGetQueueNumberContainer">
            <button type="submit" className="PersonalParticularsGetQueueNumber">
              Get Queue Number
            </button>
          </div>
          {/* <p>{name}</p>
          <p>{NRIC}</p> */}
        </form>
      </div>
      <div className="PersonalParticularsText">
        <h1>Want to choose a different hospital?</h1>
      </div>
      <a href="healthcarefacilities">
        <div className="PersonalParticularsReturn">
          <strong>Return</strong>
        </div>
      </a>
    </div>
  );
}
