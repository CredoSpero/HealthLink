import "./SymptomsInput.css";
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import React, { useState, useEffect } from "react";
// import { Component } from 'react';
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { useHistory } from "react-router-dom";
import symptomInfo from "../../data/symptomData/symptomInfo.json";
import { toast } from "react-toastify";

const options = [
  { value: 0, label: "itching" },
  { value: 1, label: "skin rash" },
  { value: 3, label: "continuous sneezing" },
  { value: 4, label: "shivering" },
  { value: 5, label: "chills" },
  { value: 6, label: "joint pain" },
  { value: 7, label: "stomach pain" },
  { value: 8, label: "acidity" },
  { value: 9, label: "ulcers on tongue" },
  { value: 10, label: "Muscle wasting" },
  { value: 11, label: "Vomitting" },
  { value: 12, label: "Burning micturition" },
  { value: 13, label: "Spotting urination" },
  { value: 14, label: "Fatigue" },
  { value: 15, label: "Weight gain" },
  { value: 16, label: "Anxiety" },
  { value: 17, label: "Cold hands and feet" },
  { value: 18, label: "Mood swings" },
  { value: 19, label: "Weight loss" },
  { value: 20, label: "Restlessness" },
  { value: 21, label: "Lethargy" },
  { value: 22, label: "Patches in throat" },
  { value: 23, label: "Irregular sugar level" },
  { value: 24, label: "Cough" },
  { value: 25, label: "High fever" },
  { value: 26, label: "Sunken eyes" },
  { value: 27, label: "Breathlessness" },
  { value: 28, label: "Sweating" },
  { value: 29, label: "Dehydration" },
  { value: 30, label: "Indigestion" },
  { value: 31, label: "Headache" },
  { value: 32, label: "Yellowish skin" },
  { value: 33, label: "Dark urine" },
  { value: 34, label: "Nausea" },
  { value: 35, label: "Loss of appetite" },
  { value: 36, label: "Pain behind the eyes" },
  { value: 37, label: "Backpain" },
  { value: 38, label: "Constipation" },
  { value: 39, label: "Abdominal pain" },
  { value: 40, label: "Diarrhoea" },
  { value: 41, label: "Mild fever" },
  { value: 42, label: "Yellow urine" },
  { value: 43, label: "Yellowing of eyes" },
  { value: 44, label: "Acute liver failure" },
  { value: 45, label: "fluid overload" },
  { value: 46, label: "Swelling of stomach" },
  { value: 47, label: "Swelled lymph nodes" },
  { value: 48, label: "Malaise" },
  { value: 49, label: "Weight gain" },
  { value: 50, label: "Blurred and distorted vision" },
  { value: 51, label: "Phlegm" },
  { value: 52, label: "Throat irritation" },
  { value: 53, label: "Redness of eyes" },
  { value: 54, label: "Sinus pressure" },
  { value: 55, label: "Runny nose" },
  { value: 56, label: "Congestion" },
  { value: 57, label: "Chest pain" },
  { value: 58, label: "Weakness in limbs" },
  { value: 59, label: "Fast heartrate" },
  { value: 60, label: "Pain during bowel movement" },
  { value: 61, label: "Pain in anal region" },
  { value: 62, label: "Bloody stool" },
  { value: 63, label: "Irritation in anus" },
  { value: 64, label: "Neck pain" },
  { value: 65, label: "Dizziness" },
  { value: 66, label: "Cramps" },
  { value: 67, label: "Bruising" },
  { value: 68, label: "Obesity" },
  { value: 69, label: "Swollen legs" },
  { value: 70, label: "Swollen blood vessels" },
  { value: 71, label: "Enlarged thyroid" },
  { value: 72, label: "Brittle nails" },
  { value: 73, label: "Swollen extremities" },
  { value: 74, label: "Excessive hunger" },
  { value: 76, label: "Drying and tingling lips" },
  { value: 77, label: "Slurred speech" },
  { value: 78, label: "Knee pain" },
  { value: 79, label: "Hip join pain" },
  { value: 80, label: "Muscle weakness" },
  { value: 81, label: "Stiff neck" },
  { value: 82, label: "Swelling joints" },
  { value: 83, label: "Movement stiffness" },
  { value: 85, label: "Loss of balance" },
  { value: 86, label: "Unsteadiness" },
  { value: 87, label: "Weakness of one body side" },
  { value: 88, label: "Loss of smell" },
  { value: 89, label: "Bladder discomfort" },
  { value: 90, label: "Foul smell of urine" },
  { value: 91, label: "Continuous need to urinate" },
  { value: 92, label: "Passage of gas" },
  { value: 93, label: "Internal itching" },
  { value: 94, label: "Typhos" },
  { value: 95, label: "Depression" },
  { value: 96, label: "Irritability" },
  { value: 97, label: "Muscle pain" },
  { value: 98, label: "Altered sensorium" },
  { value: 99, label: "Red spots over body" },
  { value: 100, label: "Belly pain" },
  { value: 101, label: "Abnormal menstruation" },
  { value: 102, label: "Dischromic patches" },
  { value: 103, label: "Watering from eyes" },
  { value: 104, label: "Increased appetite" },
  { value: 105, label: "Polyuria" },
  { value: 106, label: "Family history of diabetes" },
  { value: 107, label: "Mucoid sputum" },
  { value: 108, label: "Rusty sputum" },
  { value: 109, label: "Lack of concentration" },
  { value: 110, label: "Visual disturbances" },
  { value: 111, label: "Receiving blood transfusion" },
  { value: 112, label: "Receiving unsterile injection" },
  { value: 113, label: "Coma" },
  { value: 114, label: "Stomach bleeding" },
  { value: 115, label: "Distention of abdomen" },
  { value: 116, label: "History of alcohol consumption" },
  { value: 117, label: "Fluid overload" },
  { value: 118, label: "Blood in sputum" },
  { value: 119, label: "Prominent vein on calf" },
  { value: 120, label: "Palpitations" },
  { value: 121, label: "Pain when walking" },
  { value: 122, label: "Pus filled pimples" },
  { value: 123, label: "Blackheads" },
  { value: 124, label: "Scurring" },
  { value: 125, label: "Skin peeling" },
  { value: 126, label: "Silver like dusting" },
  { value: 127, label: "Small dents in nails" },
  { value: 128, label: "Inflammatory nails" },
  { value: 129, label: "Blister" },
  { value: 130, label: "Red sore around nose" },
  { value: 131, label: "Yellow crust ooze" },
];

export default function SymptomsInput(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const history = useHistory();
  // const [selected, setSelected] =useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // let counter = 0;

  // const decrement = () =>{
  //   counter=counter-1;
  // }

  // const twoOnchange = e =>{
  //   setSelectedOptions(e);
  //   setSelected(e[e.length-1]['label']);s
  //   console.log(selectedOptions)
  //   console.log(selected);
  //   handleChange(e);
  // }

  const ontwoSelect = (e) => {
    setTitle(e[e.length - 1]["label"]);
    setSelectedOptions(e);
    console.log(selectedOptions.length);
  };

  // useEffect(()=>{
  //   console.log(selectedOptions);
  //   if(selectedOptions.length!=0){
  //     // submitData(e);
  //   }
  // },[selectedOptions])

  useEffect(() => {
    // setSelected(selectedOptions[selectedOptions.length-1]['label']);
    // console.log(selected);
    //  handleChange(title);
    // console.log(selected);
    // if(selected === '') return;  // if delete, will sync, but search result will be wrong

    // const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${selected}`;
    // fetch(endpoint)
    // .then(response => response.json())
    // .then(json=>setSearchInfo(json));
    setDescription(symptomInfo[title]);
  }, [title]);

  // const handleChange = async e => {
  //   if(selected === '') return;  // if delete, will sync, but search result will be wrong

  //   const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${selected}`;
  //   const res = await fetch(endpoint);
  //   console.log(res);
  //   if(!res.ok){
  //     throw Error(res.statusText);
  //   }
  //   var json = await res.json();
  //   setSearchInfo(json.query.search);
  //   console.log(json);
  //   console.log(searchInfo);
  // };

  let submitData = (e) => {
    e.preventDefault();
    if (selectedOptions.length == 0) {
      toast.error(
        "Please select at least one symptom before clicking 'Get Diagnosis'"
      );
      return 0;
    }
    axios
      .post("https://flask-ml-rest-api.herokuapp.com/predict", selectedOptions)
      .then(function (response) {
        console.log(response);
        var respon = response;
        let disease = Object.keys(respon["data"]);
        let severity = Object.values(respon["data"]);

        if (severity == "mild") {
          console.log("Yeeeeeeeeeeeeeeeet");
          history.push({
            pathname: "/severitylowpage",
            state: disease,
          });
        } else if (severity == "average") {
          history.push({
            pathname: "/severitymidpage",
            state: disease,
          });
        } else {
          history.push({
            pathname: "/severityhighpage",
            state: disease,
          });
        }
      });
  };

  // if (query != "") {
  //     axios.post('http://localhost:5000/api/query', myParams)
  //         .then(function(response){
  //             console.log(response);
  //    //Perform action based on response
  //     })
  //     .catch(function(error){
  //         console.log(error);
  //    //Perform action based on error
  //     });
  // } else {
  //     alert("The search query cannot be empty")
  // }
  // }

  return (
    <div>
      <form method="post" onSubmit={submitData}>
        <div className="rectangle_6" style={{ display: "flex" }}>
          <Multiselect
            options={options}
            displayValue="label"
            placeholder="search for symptoms"
            onSelect={(e) => ontwoSelect(e)}
            // onSelect={e => setSelected(e[e.length-1]['label'])}
            // onSelect={handleSelected}
            // onRemove={decrement}

            style={{
              chips: {
                background: "#FD7979",
              },
              multiselectContainer: {
                position: "absolute",
                height: "100%",
                width: "100%",
              },
              searchBox: {
                height: "100%",
                width: "85%",
                color: "none",
                border: "none",
                height: 60,
                overflow: "auto",
              },
              optionContainer: {
                // To change css for option container
                width: 1150,
              },
            }}
          />

          <button
            className="rectangle-12"
            type="submit"
            style={{ marginLeft: "auto" }}
          >
            <text className="get_diagnosis">Get diagnosis</text>
          </button>
        </div>
      </form>

      <div className="rectangle_4">
        <h3>{title}</h3>

        <p>{description}</p>
      </div>
    </div>
  );
}
