import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUserToken }) => {
  return (
    <div className="nav">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo marvel" />
        </Link>

        <div className="links">
          <Link to="/characters">
            <span>Personnages</span>
          </Link>
          <Link to="/comics">
            <span>Comics</span>
          </Link>
          <Link to="/favorites">
            <span>Favoris</span>
          </Link>
          {userToken ? (
            <span>
              <button
                className="logout"
                onClick={() => {
                  setUserToken("");
                }}
              >
                Logout
              </button>
            </span>
          ) : (
            <span>
              <Link to="/login">
                <span>Login</span>
              </Link>
              <Link to="/signup">
                <span>Signup</span>
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
