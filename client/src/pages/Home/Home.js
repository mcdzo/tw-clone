import "./Home.css";

import { useEffect, useState } from "react";
import { FaTwitter, FaPlus } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Tuit from "../../components/Tuit/Tuit";
import NewTweetForm from "../../components/NewTweetForm/NewTweetForm";
import AllTweetsService from "../../services/Tweets/AllTweetsService";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    AllTweetsService().then((res) => {
      setAllTweets(res);
    });
  }, []);

  const onShowForm = () => {
    setShowForm(!showForm);
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
          {allTweets.map((tw) => (
            <Tuit key={tw._id} tw={tw} />
          ))}
        </div>
      </section>

      <button className="new-tuit-button" onClick={onShowForm}>
        <FaPlus />
      </button>
      {showForm && (
        <NewTweetForm
          showForm={showForm}
          setShowForm={setShowForm}
        ></NewTweetForm>
      )}
      <Navbar></Navbar>
    </>
  );
};

export default Home;

/*  */
