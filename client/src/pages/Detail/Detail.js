import "./Detail.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Tuit from "../../components/Tuit/Tuit";
import Comment from "../../components/Comment/Comment";
import NewCommentForm from "../../components/NewCommentForm/NewCommentForm";
import NewCommentService from "../../services/Tweets/NewCommentService";

const Detail = () => {
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(
    JSON.parse(window.sessionStorage.getItem("tuit-detail"))
  );
  const comments = tweet.comments;
  useEffect(() => {}, [setTweet]);

  const onGoBack = () => {
    navigate("/home");
  };

  const addComment = (comment) => {
    NewCommentService(comment).then((data) => {
      window.sessionStorage.setItem("tuit-detail", JSON.stringify(data.result));
      setTweet(data.result);
    });
  };

  return (
    <div className="detail-page">
      <header className="tw-detail-header">
        <button className="tw-detail-go-back-button" onClick={onGoBack}>
          <FaArrowLeft />
        </button>
        <h2>Tweet</h2>
      </header>
      <Tuit tw={tweet}></Tuit>

      <section className="tw-detail-comment-section">
        <NewCommentForm addComment={addComment}></NewCommentForm>
        <div className="tw-detail-comments-box">
          {comments.map((comment) => (
            <Comment key={comment._id} c={comment}></Comment>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Detail;
