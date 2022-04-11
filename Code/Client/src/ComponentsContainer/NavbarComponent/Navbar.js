import logo from '../../images/caduceus.png'
import './Navbar.css'
export default function Navbar(){
    return(
        <nav>
            <a href='/'><img src = {logo} width="120px" height = "120px" className="Logo"></img></a>
            <div className='NavText'>
                <h1>HealthLink</h1>
                <p>A one-stop health buddy to a healther and better you</p>
            </div>
        </nav>
    )
}