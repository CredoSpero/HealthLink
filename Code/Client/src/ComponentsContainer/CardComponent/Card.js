import diagnosis_image from '../../images/diagnosis.jpg'
import queue_image from '../../images/queue.jpg'
import hospital_image from '../../images/hospital.png'
import './Card.css'
export default function Card(){
    return(
        <div className="three_choices">
            <a href = "symptomsinput">
                <div className="Rectangle1">
                        <div className="inner_text">
                            <h2>Diagnose</h2>
                            <img src = {diagnosis_image} width="100%"></img>
                            <p>Use our state-of-the-art machine learning model to identify possible conditions and treatment</p>
                        </div>
               </div>
            </a>   

            <a href='healthcarefacilities'>
                <div className="Rectangle2">
                    <div className="inner_text">
                        <h2>Hospital facilities near you</h2>
                        <img src = {hospital_image} width="100%"></img>
                        <p>Find hospital facilities near you! Real-time directions and queue managment system included!</p>
                    </div>
                </div>
            </a>    
            
            <a href='checkqueue'>
                <div className="Rectangle3">
                    <div className="inner_text">
                        <h2>Check queue status</h2>
                        <img src = {queue_image} width="100%"></img>
                        <p>Never miss an appointment! Check your appointment status and the number of people  ahead of you!</p>
                    </div>
                </div>
            </a>
        </div> 
    )
}