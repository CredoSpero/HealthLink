import logo from "../../images/caduceus.png";
import "./NavbarQN.css";
export default function NavbarQN() {
  return (
    <nav>
      <a href="/">
        <img src={logo} width="120px" height="120px" className="Logo"></img>
      </a>
      <div className="NavTextQN">
        <h1>Your Queue Number</h1>
        <p>
          Your appointment will be cancelled if you don't show up within 5
          minutes after your queue number is called
        </p>
      </div>
    </nav>
  );
}
