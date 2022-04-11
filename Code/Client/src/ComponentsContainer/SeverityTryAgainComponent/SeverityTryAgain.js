import React from "react";
import "./SeverityTryAgain.css";

export default function SeverityTryAgain() {
  return (
    <div className="SeverityTryAgain-Container">
      <h1>Want to try again?</h1>
      <h2>You can try as many time as you want</h2>
      <a href="/symptomsinput">
        <div className="TryAgain-Box">
          <h2>Start now</h2>
        </div>
      </a>
    </div>
  );
}
