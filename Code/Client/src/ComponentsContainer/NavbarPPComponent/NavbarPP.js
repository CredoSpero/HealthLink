import logo from '../../images/caduceus.png'
import './NavbarPP.css'
export default function NavbarQN(){
    return(
        <nav>
            <a href='/'><img src = {logo} width="120px" height = "120px" className="Logo"></img></a>
            <div className='NavTextPP'>
                <h1>Personal Particulars</h1>
                <p>Information will only be used to make hospital/clinic booking. It will not be stored by this company</p>
            </div>
        </nav>
    )
}