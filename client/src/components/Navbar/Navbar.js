import "./Navbar.css";
import { GoHome, GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const handleProfile = () => {
    window.sessionStorage.setItem("user-to-see", JSON.stringify(user));
  };
  return (
    <div className="navbar">
      <Link to="/home">
        <GoHome />
      </Link>
      <Link to="/search">
        <GoSearch />
      </Link>
      <Link onClick={handleProfile} to={`/profile/${user._id}`}>
        <FaRegUser />
      </Link>
    </div>
  );
};

export default Navbar;
