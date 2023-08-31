import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav">
      <div className="container">
        <img src={logo} alt="Logo marvel" />
        <div className="links">
          <Link to="/characters">
            <span>Personnages</span>
          </Link>
          <Link to="/comics">
            <span>Comics</span>
          </Link>
          <Link to="#">
            <span>Favoris</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
