import logo from "../assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

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
                style={{
                  background: "none",
                  border: "1px solid #FFF",
                  padding: "5px 10px",
                  borderRadius: "50px",
                  color: "#FFF",
                  padding: "12px 24px",
                }}
                className="logout"
                onClick={() => {
                  Cookies.remove("token");
                  Navigate("/");
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
