import "./NewTweetForm.css";

import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

const NewTweetForm = ({ showForm, setShowForm, newTweet }) => {
  const [text, setText] = useState("");

  const handleText = (evt) => {
    setText(evt.target.value);
  };

  const onCloseForm = () => {
    setShowForm(!showForm);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (text === "") {
      alert("No se puede agregar un tuit vacio.");
    } else {
      newTweet(text);
    }
  };
  return (
    <>
      <div className="modal-form">
        <form className="new-tw-form" type="submit" onSubmit={onSubmit}>
          <header className="new-tw-form-header">
            <button className="new-tw-button">Twittear</button>
            <button className="go-back-button" onClick={onCloseForm}>
              <FaArrowLeft />
            </button>
          </header>
          <div className="new-tw-input-container">
            <input
              type="text"
              className="new-tw-input"
              placeholder="Que está pasando?"
              value={text}
              onChange={handleText}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewTweetForm;
