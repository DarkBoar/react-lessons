import React from "react";
import "./AnswersList.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => {
  return (
    <ul className="Answerslist">
      { props.answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            answerTotal={props.state === index + 1 ? props.answerTotal : null}
            state={props.state === index + 1 ? "active" : ""}
            handleAnswer={props.handleAnswer}
          />
        )
      }) }
    </ul>
  )
}

export default AnswersList;