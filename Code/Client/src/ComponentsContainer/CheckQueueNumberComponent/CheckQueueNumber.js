import "./CheckQueueNumber.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";

export default function QueueInfo(props) {
  const history = useHistory();

  const [NRIC, setNRIC] = useState("");

  const handleNRIC = (e) => {
    setNRIC(e.target.value);
  };

  const validInput = () => {
    // Ensrue the field is not empty
    if (NRIC == "") {
      toast.error("NRIC is required!");
      return 0;
    }

    // Singapore NRIC standard, S/T/F/G followed by 7 numbers followed by A-Z
    const regex = /^[STFG]\d{7}[A-Z]$/;
    if (!regex.test(NRIC.toUpperCase())) {
      toast.error("Invalid NRIC. Check again!");
      return 0;
    }
    return 1;
  };

  let submitForm = async (e) => {
    e.preventDefault();
    try {
      if (!validInput()) {
        return;
      }
      const getRes = await Axios.get(
        `https://sswwee.herokuapp.com/getUser?NRIC=${NRIC}`
      );
      const info = getRes.data;
      console.log(info);
      const name = info.name;
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
      history.push({
        pathname: "/QueueInfo",
        state: pushData,
      });
    } catch (error) {
      // IF reaches here, likely is NRIC not in database
      console.log(error);
      toast.error("User not in queue!");
    }
  };

  return (
    <div>
      <div className="CheckQueueNumberRectangle">
        <form method="get" onSubmit={submitForm}>
          <div className="CheckQueueNumberNameNRIC">
            <label for="NRIC">NRIC</label>
            <br></br>
            <input
              className="CheckQueueNumberInputBox"
              type="text"
              id="NRIC"
              value={NRIC}
              onChange={handleNRIC}
              placeholder="NRIC"
            ></input>
            <br></br>
          </div>
          <div className="CheckQueueNumberCheckQueueNumber">
            <button id="search-button" type="submit">
              Check Queue Number
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
