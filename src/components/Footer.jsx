import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      Made with ♥️ at <Link to="https://www.lereacteur.io/">Le reacteur</Link>{" "}
      by <Link to="https://github.com/jrlherm">JR Lherm</Link>
    </div>
  );
};

export default Footer;
