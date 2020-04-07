import React from "react";
import "./AnswerItem.css";

const AnswerItem = (props) => {
  const cls = ["Answeritem"];

  if (props.state) {
    cls.push(props.state);
  }
  if (props.answerTotal) {
    cls.push(props.answerTotal);
  }

  return (
    <button
      className={cls.join(" ")}
      onClick={() => props.handleAnswer(props.answer.id)}
    >
      {
        props.name ? props.name : props.answer.text
      }
    </button>
  );
};

export default AnswerItem;
