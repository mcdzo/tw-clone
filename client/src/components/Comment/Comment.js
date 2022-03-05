import "./Comment.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import LikeCommentService from "../../services/Tweets/LikeCommentService";
import DislikeCommentService from "../../services/Tweets/DislikeCommentService";

const Comment = ({ Comment }) => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const [comment, setComment] = useState(Comment);
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    const like = comment.comment_likes.filter((id) => id === user._id);

    if (like.length === 0) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }, [comment]);

  const onLikeComment = (id) => {
    LikeCommentService(id).then((data) => {
      setComment(data.result);
    });
  };

  const onDislikeComment = (id) => {
    DislikeCommentService(id).then((data) => {
      setComment(data.result);
    });
  };
  return (
    <div className="comment">
      <div className="comment-profile-pic"></div>
      <div className="comment-info">
        <div className="comment-info-row">
          <div className="comment-author">@{comment.comment_username}</div>
          <div className="comment-content">{comment.comment_content}</div>
        </div>
        <div className="comment-info-row">
          <div className="comment-time">2h</div>
          <div className="comment-likes">
            Likes {comment.comment_likes.length}
          </div>
        </div>
      </div>
      <div className="comment-action">
        {isLiked ? (
          <button onClick={() => onDislikeComment(comment._id)}>
            <FaHeart className="like-icon red" />
          </button>
        ) : (
          <button onClick={() => onLikeComment(comment._id)}>
            <FaRegHeart className="like-icon " />
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
