import "./Tuit.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaShareAltSquare,
} from "react-icons/fa";

import SingleTwService from "../../services/Tweets/SingleTwService";
import LikeService from "../../services/Tweets/LikeService";
import DisLikeService from "../../services/Tweets/DisLikeService";

const Tuit = ({ tw }) => {
  const navigate = useNavigate();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [tweet, setTweet] = useState(tw);
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    const like = tweet.likes.filter((id) => id === user._id);

    if (like.length === 0) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }, [tweet]);

  const onDetail = (id) => {
    SingleTwService(id).then((tweet) => {
      window.sessionStorage.setItem("tuit-detail", JSON.stringify(tweet));
      navigate(`/detail/${id}`);
    });
  };

  const onAddLike = (id) => {
    LikeService(id).then((data) => {
      setTweet(data.result);
    });
  };

  const onDisLike = (id) => {
    DisLikeService(id).then((data) => {
      setTweet(data.result);
    });
  };

  return (
    <>
      <div className="tuit">
        <div className="tuit-profile-pic">
          <span></span>
        </div>
        <div className="tuit-info">
          <div className="tuit-title">
            <div className="tuit-author">
              <strong>
                {tweet.name} {tweet.surname}
              </strong>
              <small>@{tweet.username}</small>
            </div>
            <div className="tuit-date"> 19 Feb.</div>
          </div>
          <div className="tuit-content">
            <p onClick={() => onDetail(tweet._id)}>{tweet.tuit_content}</p>
          </div>
          <div className="tuit-actions">
            <div className="comment-action">
              <button onClick={() => onDetail(tweet._id)}>
                <FaRegComment className="comment-icon"></FaRegComment>
              </button>
              {tweet.comments.length}
            </div>
            <div className="like-action">
              {isLiked ? (
                <button onClick={() => onDisLike(tweet._id)}>
                  <FaHeart className="like-icon red"></FaHeart>
                </button>
              ) : (
                <button onClick={() => onAddLike(tweet._id)}>
                  <FaRegHeart className="like-icon"></FaRegHeart>
                </button>
              )}

              {tweet.likes.length}
            </div>
            <div className="share-action">
              <button>
                <FaShareAltSquare className="share-icon"></FaShareAltSquare>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tuit;
