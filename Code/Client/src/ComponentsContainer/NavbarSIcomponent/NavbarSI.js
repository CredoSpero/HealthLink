import logo from '../../images/caduceus.png'
import './NavbarSI.css'
export default function NavbarQN(){
    return(
        <nav>
            <a href='/'><img src = {logo} width="120px" height = "120px" className="Logo"></img></a>
            <div className='NavText'>
                <h1>Input Symptoms</h1>
                <p>Input symptoms to find out related disease</p>
            </div>
        </nav>
    )
}