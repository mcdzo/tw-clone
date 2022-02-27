import "./Home.css";

import { useContext, useEffect, useState } from "react";
import { FaTwitter, FaPlus } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Tuit from "../../components/Tuit/Tuit";
import NewTweetForm from "../../components/NewTweetForm/NewTweetForm";
import AllTweetsService from "../../services/Tweets/AllTweetsService";
import TweetContext from "../../context/TweetsContext";
import NewTwService from "../../services/Tweets/NewTwService";

const Home = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [showForm, setShowForm] = useState(false);
  const { tweets, dispatch } = useContext(TweetContext);

  useEffect(() => {
    AllTweetsService().then((tweets) => {
      dispatch({
        type: "GET_TWEETS",
        tweets: tweets,
      });
    });
  }, [dispatch]);

  const onShowForm = () => {
    setShowForm(!showForm);
  };
  const newTweet = (text) => {
    const tw = {
      token: window.sessionStorage.getItem("jwt"),
      user_id: user._id,
      name: user.name,
      username: user.username,
      tuit_content: text,
    };

    NewTwService(tw).then((tweet) => {
      dispatch({
        type: "ADD_TWEET",
        tweet: tweet,
      });
      setShowForm(!showForm);
    });
  };

  return (
    <>
      <section className="app-content">
        <div className="feed">
          <header className="feed-header">
            <a href="/home" className="feed-home-link">
              Inicio
            </a>
            <a href="/home">
              <FaTwitter className="feed-tw-icon"></FaTwitter>
            </a>
          </header>
          <div className="tweets-list">
            {tweets.map((tw) => (
              <Tuit key={tw._id} tw={tw} />
            ))}
          </div>
        </div>
      </section>

      <button className="new-tuit-button" onClick={onShowForm}>
        <FaPlus />
      </button>
      {showForm && (
        <NewTweetForm
          showForm={showForm}
          setShowForm={setShowForm}
          newTweet={newTweet}
        ></NewTweetForm>
      )}
      <Navbar></Navbar>
    </>
  );
};

export default Home;

/*  */
