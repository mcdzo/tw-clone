import "./Detail.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Tuit from "../../components/Tuit/Tuit";
import Comment from "../../components/Comment/Comment";

const Detail = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const tweet = JSON.parse(window.sessionStorage.getItem("tuit-detail"));

  useEffect(() => {
    setComments(tweet.comments);
  }, []);

  const onGoBack = () => {
    navigate("/home");
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
        <form className="tw-detail-comment-form">
          <input type="text" placeholder="Deja tu comentario"></input>
          <button className="new-comment-button">Comentar</button>
        </form>
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment}></Comment>
        ))}
      </section>
    </div>
  );
};

export default Detail;
