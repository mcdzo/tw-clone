import { useState } from "react";

import "./NewCommentForm.css";

const NewCommentForm = ({ addComment }) => {
  const [comment, setComment] = useState("");

  const handleComment = (evt) => {
    setComment(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (comment === "") {
      alert("No se puede agregar un comentario vacio");
    } else {
      console.log(comment);
      addComment(comment);
    }
  };
  return (
    <form className="tw-detail-comment-form" onSubmit={onSubmit}>
      <input
        onChange={handleComment}
        value={comment}
        type="text"
        placeholder="Deja tu comentario"
      ></input>
      <button className="new-comment-button">Comentar</button>
    </form>
  );
};

export default NewCommentForm;
