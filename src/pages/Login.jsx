import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setUserToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (click) => {
    click.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://site--marvel-backend--vm2w9vyj7r62.code.run/login",
        formData
      );

      Cookies.set("token", response.data.token, { expires: 14 });

      console.log("response.data => ", response.data);
      console.log("response.data.token => ", response.data.token);

      // If the token has been created redirect to "/"
      if (response.data.token) {
        setUserToken(response.data.token);
        navigate("/comics");
      }
    } catch (error) {
      console.log("Error during account login ==> ", error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="signin">
      <div className="container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
          <Link to="/signup">Tu n'as pas de compte ? Inscris-toi !</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
