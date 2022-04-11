import "./QueueInfo.css";

import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import Axios from "axios";

// When routing to this page, need to pass in a "json object with user, hospital, ahead, queue element" as a location.state
export default function QueueInfo() {
  const location = useLocation();
  const history = useHistory();
  var info = location.state;
  console.log(info);

  const user = info.name;
  const hospital = info.hospital;
  const ahead = info.ahead;
  const queue = info.queue;
  const NRIC = info.NRIC;

  let removeUser = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.delete(
        `https://sswwee.herokuapp.com/removeUser?NRIC=${NRIC}`
      );
      history.push({
        pathname: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="QueueInfoRectangle">
        <div className="QueueInfoHi">
          <h1>Hi {user},</h1>
        </div>

        <div className="QueueInfoAppointment">
          <p>Your appointment at</p>
          <p className="colour">{hospital}</p>
        </div>

        <div className="QueueInfoPeopleAhead">
          <p>Number of people ahead</p>
          <div className="QueueInfoInfo">
            <p>{ahead}</p>
          </div>
        </div>
        <div className="QueueInfoQueueNumber">
          <p>Your Queue Number</p>
          <div className="QueueNumber">{queue}</div>
        </div>
      </div>

      <div className="QueueInfoLeavetheQueue">
        <button id="QueueInfoLeaveButton" onClick={removeUser}>
          Leave the Queue
        </button>
      </div>
    </div>
  );
}
