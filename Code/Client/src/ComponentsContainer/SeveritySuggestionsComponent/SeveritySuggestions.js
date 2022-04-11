import React from "react";
import "./SeveritySuggestions.css";
import file from "../../images/SeverityPageImages/file.png";

export default function SeveritySuggestions(props) {
  const renderSuggestions = () => {
    //map function used to iterate over an array, to render the data to the dom. Each iteration value is stored in 'value' and the index is stored in i.
    return props.suggestions.map((value, i) => <li key={i}>{value}</li>);
  };

  return (
    <div className="SeveritySuggestions-container">
      <div
        className="SeveritySuggestions-grid"
        style={{ backgroundColor: props.color }}
      >
        {/* <div className=> */}
        <img src={file} width="30px" height="30px"></img>
        {/* </div> */}
        <h1>Suggestions</h1>
        <div className="suggestions-body">
          <ul>{renderSuggestions()}</ul>
        </div>
      </div>
    </div>
  );
}
