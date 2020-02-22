import React from "react";
import './ActiveQuiz.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => {
  return (
    <div className="ActiveQuiz">
      <p className="Question">
        <span>
          <strong>{props.answerNumber}. </strong>
          {props.question}
        </span>
        <small>{props.answerNumber} из {props.questionLength}</small>
      </p>

      <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}

export default ActiveQuiz;