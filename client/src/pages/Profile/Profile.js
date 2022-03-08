import "./Profile.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useSearchUser from "../../hooks/useSearchUser";
import Tuit from "../../components/Tuit/Tuit";

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [isActive, setIsActive] = useState({
    tweets: true,
    favs: false,
  });

  //search user and his tweets to the db
  const { user, tweets } = useSearchUser(username);
  const isLoadingTweets = tweets === undefined;
  const isLoadingUser = user === undefined;

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
            <h2> </h2>
          </header>
          {isLoadingUser ? (
            <div className="profile-user-info">
              <div className="profile-user-info-row"> ...</div>
              <div className="profile-user-info-row">
                <h4>...</h4>
                <small>...</small>
              </div>
            </div>
          ) : (
            <div className="profile-user-info">
              <div className="profile-user-info-row">@{user.username}</div>
              <div className="profile-user-info-row">
                <h4></h4>
                <small></small>
              </div>
            </div>
          )}

          <div className="profile-section-selector">
            <div className="profile-tweets-selector ">
              <button onClick={handleTweetsSection}>Tweets</button>
            </div>
            <div className="profile-favs-selector ">
              <button onClick={handleFavsSection}>Favs</button>
            </div>
          </div>
          {isActive.tweets && (
            <div className="profile-tweets-section">
              {isLoadingTweets ? (
                <h1>Cargando...</h1>
              ) : (
                <>
                  {tweets.map((tuit) => (
                    <Tuit key={tuit._id} tw={tuit}></Tuit>
                  ))}
                </>
              )}
            </div>
          )}
          {isActive.favs && <div className="profile-favs-section">favs</div>}
        </div>
      </section>
      <Navbar></Navbar>
    </>
  );
};

export default Profile;
