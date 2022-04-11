import logo from '../../images/caduceus.png'
import './NavbarQNChecker.css'
export default function NavbarQNChecker(){
    return(
        <nav>
            <a href='/'><img src = {logo} width="120px" height = "120px" className="Logo"></img></a>
            <div className='NavTextPP'>
                <h1>Queue Number Checker</h1>
                <p>Information will only be used to make hospital/clinic booking. It will not be stored by this company</p>
            </div>
        </nav>
    )
}