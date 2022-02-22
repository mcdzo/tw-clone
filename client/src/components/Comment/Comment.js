import "./Comment.css";
import { FaRegHeart } from "react-icons/fa";
const Comment = ({ comment }) => {
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
        <button>
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
};

export default Comment;
