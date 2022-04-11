import React from 'react'
import logo from "../../images/caduceus.png"
import "./SeverityNavbar.css"

export default function SeverityNavbar(props) {
  return (
    <div className='SeverityNavbar-container'>
        <a href='/'><img src = {logo} alt="App Logo" width="120px" height= "120px" className="Logo"></img></a>
        <div className="Severity-text" style={{backgroundColor:props.color}}>
            <h1>{props.severityText}</h1>
        </div>
    </div>
  )
}
