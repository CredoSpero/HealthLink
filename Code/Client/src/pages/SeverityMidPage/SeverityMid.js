import React from "react";
import "./SeverityMid.css";
import SeverityNavbar from "../../ComponentsContainer/SeverityNavbarComponent/SeverityNavbar";
import SeveritySuggestions from "../../ComponentsContainer/SeveritySuggestionsComponent/SeveritySuggestions";
import SeverityPD from "../../ComponentsContainer/SeverityPDComponent/SeverityPD";
import SeverityTryAgain from "../../ComponentsContainer/SeverityTryAgainComponent/SeverityTryAgain";
import SeverityHospital from "../../ComponentsContainer/SeverityHospitalComponent/SeverityHospital";
import { useLocation } from "react-router-dom";
import diagnosisDefn from "../../data/severityData/diagnosisDefn.json";
import diagnosisSoln from "../../data/severityData/diagnosisSoln.json";

export default function SeverityMid(props) {
  const location = useLocation();
  var disease = location.state;
  console.log(disease);
  const defn = diagnosisDefn[disease];
  const soln = diagnosisSoln[disease];

  return (
    <div className="SeverityMidPage-container">
      <div className="SeverityMidPage-grid">
        <SeverityNavbar severityText={"Mid severity"} color={"#A4A03E70"} />
        <SeveritySuggestions
          suggestions={[
            "Preliminary diagnosis suggest that you require medical attention but its not urgent",
            "We recommend you to visit a nearby GP or Polyclinic. You could find nearby clinics and make a booking at the bottom of the page",
          ]}
          color={"#A4A03E20"}
        />
        <SeverityPD
          condition={disease}
          diagnosisDefn={defn}
          color={"#A4A03E20"}
          solutionsLink={soln}
        />
        <SeverityHospital />
        <div className="SeverityMidTryAgain">
          <SeverityTryAgain />
        </div>
      </div>
    </div>
  );
}
