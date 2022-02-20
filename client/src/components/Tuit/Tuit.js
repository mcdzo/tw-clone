import "./Tuit.css";

import { FaRegHeart, FaRegComment, FaShareAltSquare } from "react-icons/fa";

const Tuit = ({ tw }) => {
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
                {tw.name} {tw.surname}
              </strong>
              <small>{tw.username}</small>
            </div>
            <div className="tuit-date"> 19 Feb.</div>
          </div>
          <div className="tuit-content">
            <p>{tw.tuit_content}</p>
          </div>
          <div className="tuit-actions">
            <div className="comment-action">
              <button>
                <FaRegComment className="comment-icon"></FaRegComment>
              </button>
              {tw.comments.length}
            </div>
            <div className="like-action">
              <button>
                <FaRegHeart className="like-icon"></FaRegHeart>
              </button>
              {tw.likes.length}
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
