import React from "react";
import "./SeverityLow.css";
import SeverityNavbar from "../../ComponentsContainer/SeverityNavbarComponent/SeverityNavbar";
import SeveritySuggestions from "../../ComponentsContainer/SeveritySuggestionsComponent/SeveritySuggestions";
import SeverityPD from "../../ComponentsContainer/SeverityPDComponent/SeverityPD";
import SeverityTryAgain from "../../ComponentsContainer/SeverityTryAgainComponent/SeverityTryAgain";
import { useLocation } from "react-router-dom";
import diagnosisDefn from "../../data/severityData/diagnosisDefn.json";
import diagnosisSoln from "../../data/severityData/diagnosisSoln.json";

export default function SeverityLowPage(props) {
  const location = useLocation();
  var disease = location.state;
  const defn = diagnosisDefn[disease];
  const soln = diagnosisSoln[disease];

  return (
    <div className="SeverityLowPage-container">
      <div className="SeverityLowPage-grid">
        <SeverityNavbar severityText={"Low severity"} color={"#3AE44253"} />
        <SeveritySuggestions
          suggestions={[
            "Preliminary diagnosis suggest that you do not require medical attention",
            "You could visit a nearby pharmacy for over-the-counter medication if necessary",
          ]}
          color={"#3AE44220"}
        />
        <SeverityPD
          condition={disease}
          diagnosisDefn={defn}
          color={"#3AE44220"}
          solutionsLink={soln}
        />
        <div className="SeverityLowTryAgain">
          <SeverityTryAgain />
        </div>
      </div>
    </div>
  );
}
