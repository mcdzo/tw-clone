import "./Navbar.css";
import { GoHome, GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
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
        <FaRegUser />
      </Link>
    </div>
  );
};

export default Navbar;
