import "./Profile.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const [isActive, setIsActive] = useState({
    tweets: true,
    favs: false,
  });
  const navigate = useNavigate();
  const user = JSON.parse(window.sessionStorage.getItem("user-to-see"));

  const onGoBack = () => {
    window.sessionStorage.removeItem("user-to-see");
    navigate("/home");
  };

  const handleTweetsSection = () => {
    setIsActive({
      tweets: true,
      favs: false,
    });
  };
  const handleFavsSection = () => {
    setIsActive({
      tweets: false,
      favs: true,
    });
  };

  return (
    <>
      <section className="app-content">
        <div className="profile-page">
          <header className="profile-page-header">
            <button className="profile-page-go-back-button" onClick={onGoBack}>
              <FaArrowLeft />
            </button>
            <h2> @{user.username}</h2>
          </header>
          <div className="profile-user-info">
            <div className="profile-user-info-row"></div>
            <div className="profile-user-info-row">
              <h4>
                {user.name} {user.surname}
              </h4>
              <small>@{user.username}</small>
            </div>
          </div>
          <div className="profile-section-selector">
            <div className="profile-tweets-selector ">
              <button onClick={handleTweetsSection}>Tweets</button>
            </div>
            <div className="profile-favs-selector ">
              <button onClick={handleFavsSection}>Favs</button>
            </div>
          </div>
          {isActive.tweets && (
            <div className="profle-tweets-section">tweets</div>
          )}
          {isActive.favs && <div className="profle-favs-section">favs</div>}
        </div>
      </section>
      <Navbar></Navbar>
    </>
  );
};

export default Profile;
