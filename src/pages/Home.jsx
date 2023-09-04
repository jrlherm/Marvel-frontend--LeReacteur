import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="home"
      style={{
        height: "calc(100vh - 122px)",
        backgroundImage: `url(${"https://www.komar.de/media/cms/fileadmin/user_upload/Category/Fototapeten/Marvel/komar-fototapeten-marvel.jpg"})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#FFF",
      }}
    >
      <h1>Welcome to marvel explorer</h1>
      <div className="buttons">
        <div className="homelink">
          <Link to="/characters">Explore characters</Link>
        </div>
        <div className="homelink">
          <Link to="/characters">Explore Comics</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
