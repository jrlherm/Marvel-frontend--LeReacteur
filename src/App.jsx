import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.scss";

// Import pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);

  return (
    <>
      <Router>
        <Header userToken={userToken} setUserToken={setUserToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comic/:id" element={<Comic />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/login"
            element={<Login setUserToken={setUserToken} />}
          />
          <Route
            path="/signup"
            element={
              <Signup userToken={userToken} setUserToken={setUserToken} />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
