import React from "react";
import "./SeverityHospital.css";
import hospital from "../../images/SeverityPageImages/hospital.png";
import smap from "../../images/SeverityPageImages/smap.png";

export default function SeverityHospital() {
  return (
    <div className="SeverityHospital-Container">
      <div className="SeverityHospital-Grid">
        <img src={hospital} alt="hospital" width="30px" height="30px"></img>
        <h1>Find a hospital/clinic near you</h1>
        <p>
          If you have concerns about your health and are considering visiting a
          nearby doctor, you can make a booking from here.
        </p>
        <div className="smap-image">
          <img src={smap} alt="smap" width="750px"></img>
        </div>
        <div className="SeverityHospital-MakeBooking">
          <a href="/healthcarefacilities"><h1>Make a booking</h1></a>
        </div>
      </div>
    </div>
  );
}
