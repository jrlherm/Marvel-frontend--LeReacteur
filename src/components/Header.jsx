import logo from "../assets/logo.png";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ userToken, setUserToken }) => {
  const [logout, setLogout] = useState(false);

  return (
    <div className="nav">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo marvel" />
        </Link>

        <div className="header-links">
          <div className="header-links-left">
            <Link to="/characters">
              <span>Personnages</span>
            </Link>
            <Link to="/comics">
              <span>Comics</span>
            </Link>
          </div>
          {userToken ? (
            <div>
              <Link to="/favorites">
                <span>Favoris</span>
              </Link>
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
                    setLogout(!logout);
                  }}
                >
                  Logout
                </button>
              </span>
            </div>
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
