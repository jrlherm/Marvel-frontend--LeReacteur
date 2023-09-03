import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    acceptCGU: false,
  });

  const navigate = useNavigate();

  // Function to handle every change in the form to store it in formData
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("handle submit launched");

    try {
      const response = await axios.post(
        "https://site--marvel-backend--vm2w9vyj7r62.code.run/signup",
        formData
      );
      console.log("Account created => ", response.data);
      console.log("token => ", response.data.token);
      navigate("/comics");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Email déjà utilisé.");
      }
      console.log("Error during account creation ==> ", error.response);
    }

    setIsLoading(false);
  };

  return (
    <div className="signup-container forms">
      <div className="container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="signup-login-error-message">{errorMessage}</span>
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <div className="accept-cgu">
            <input
              type="checkbox"
              name="acceptCGU"
              value={formData.acceptCGU}
              onChange={handleChange}
            />
            <label htmlFor="acceptCGU">
              Accepter les conditions générales d'utilisation.
            </label>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </div>
    </div>
  );
};

export default Signup;
