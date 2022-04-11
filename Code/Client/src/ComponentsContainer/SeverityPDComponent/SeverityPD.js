import React from "react";
import "./SeverityPD.css";
import stethoscope from "../../images/SeverityPageImages/stethoscope.png";

export default function SeverityPD(props) {
  const renderSolutionsLink = () => {
    //map function used to iterate over an array, to render the data to the dom. Each iteration value is stored in 'value' and the index is stored in i.
    //value is an array of array. Each subarray is [<link>, <LInk name to be displayed>]
    return props.solutionsLink.map((value, i) => (
      <li key={i}>
        <a href={value[0]} target="_blank">
          {value[1]}
        </a>
      </li>
    ));
  };
  return (
    <div className="SeverityPD-Container">
      <div className="SeverityPD-Grid" style={{ backgroundColor: props.color }}>
        <img src={stethoscope} width="30px" height="30px"></img>
        <h1>Preliminary diagnosis</h1>
        <div className="SeverityPD-Grid-Condition">
          <h2>{props.condition}</h2>
        </div>
        <p>{props.diagnosisDefn}</p>
        <div className="SeverityPD-Grid-Solution">
          <u>Link to possible solutions</u>
          <ul id="renderSL">{renderSolutionsLink()}</ul>
        </div>
      </div>
    </div>
  );
}
