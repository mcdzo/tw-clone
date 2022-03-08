import "./Navbar.css";
import { GoHome, GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserTweetsService from "../../services/Tweets/UserTweetsService";
import SearchUserService from "../../services/Users/SearchUserService";

const Navbar = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  return (
    <div className="navbar">
      <Link to="/home">
        <GoHome />
      </Link>
      <Link to="/search">
        <GoSearch />
      </Link>
      <Link to={`/profile/${user.username}`}>
        <FaRegUser />
      </Link>
    </div>
  );
};

export default Navbar;
/*


import "./Navbar.css";
import { GoHome, GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserTweetsService from "../../services/Tweets/UserTweetsService";
import SearchUserService from "../../services/Users/SearchUserService";

const Navbar = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const handleProfile = (username) => {
    //search user
    SearchUserService(username).then((data) => {
      console.log(data);

      //if exists:
      if (data.value) {
        window.sessionStorage.setItem("user-to-see", JSON.stringify(data.user));
        UserTweetsService(username).then((data) => {
          window.sessionStorage.setItem("user-tweets", JSON.stringify(data));
        });
      }
    });
  };
  return (
    <div className="navbar">
      <Link to="/home">
        <GoHome />
      </Link>
      <Link to="/search">
        <GoSearch />
      </Link>
      <Link
        onClick={() => handleProfile(user.username)}
        to={`/profile/${user.username}`}
      >
        <FaRegUser />
      </Link>
    </div>
  );
};

export default Navbar;
*/
