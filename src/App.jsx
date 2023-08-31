import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

// Import pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Characters from "./pages/Characters";
import Character from "./pages/Character";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comic/:id" element={<Comic />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:id" element={<Character />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
