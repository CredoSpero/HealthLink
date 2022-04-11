import React from "react";
import "./SeverityHigh.css";
import SeverityNavbar from "../../ComponentsContainer/SeverityNavbarComponent/SeverityNavbar";
import SeveritySuggestions from "../../ComponentsContainer/SeveritySuggestionsComponent/SeveritySuggestions";
import SeverityPD from "../../ComponentsContainer/SeverityPDComponent/SeverityPD";
import SeverityAmbulance from "../../ComponentsContainer/SeverityAmbulanceComponent/SeverityAmbulance";
import SeverityTryAgain from "../../ComponentsContainer/SeverityTryAgainComponent/SeverityTryAgain";
import { useLocation } from "react-router-dom";
import diagnosisDefn from "../../data/severityData/diagnosisDefn.json";
import diagnosisSoln from "../../data/severityData/diagnosisSoln.json";

export default function SeverityHighPage(props) {
  const location = useLocation();
  var disease = location.state;
  const defn = diagnosisDefn[disease];
  const soln = diagnosisSoln[disease];

  return (
    <div className="SeverityHighPage-container">
      <div className="SeverityHighPage-grid">
        <SeverityNavbar severityText={"High severity"} color={"#FF000053"} />
        <SeveritySuggestions
          suggestions={[
            "Preliminary diagnosis suggest that you require immediate medical attention",
            "Time is of the essence. Please call the ambulance using the button below",
          ]}
          color={"#A43E3E20"}
        />
        <SeverityPD
          condition={disease}
          diagnosisDefn={defn}
          color={"#A43E3E20"}
          solutionsLink={soln}
        />
        <SeverityAmbulance />
        <div className="SeverityHighTryAgain">
          <SeverityTryAgain />
        </div>
      </div>
    </div>
  );
}
