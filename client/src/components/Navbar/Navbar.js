import "./Navbar.css";
import { GoHome, GoSearch, GoBell } from "react-icons/go";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/home">
        <GoHome />
      </Link>
      <Link to="/search">
        <GoSearch />
      </Link>
      <Link to="/notifications">
        <GoBell />
      </Link>
    </div>
  );
};

export default Navbar;
