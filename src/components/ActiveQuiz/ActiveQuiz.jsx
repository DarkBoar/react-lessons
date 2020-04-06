import React from "react";
import "./ActiveQuiz.css";
import AnswersList from "./AnswersList/AnswersList";
import Button from "../UI/Button/Button";

const ActiveQuiz = (props) => (
  <div className="ActiveQuiz">
    <div className="activeTitle">
      {props.nameQuiz}
    </div>
    <p className="Question">
      <span>
        {props.question}
      </span>
      <small>
        {props.answerNumber}
        /
        {props.questionLength}
      </small>
    </p>

    <AnswersList
      answers={props.answers}
      state={props.stateAnswer}
      handleAnswer={props.handleAnswer}
      answerTotal={props.answerTotal}
    />

    <div>
      { props.answerNextBtn
        ? (
          <Button
            type="success"
            onClick={props.onAnswerNext}
          >
            Следующий вопрос
          </Button>
        )
        : (
          <Button
            type="success"
            disabled={!props.answerNext}
            onClick={() => props.onAnswerSuccess(props.stateAnswer)}
          >
            Ответить
          </Button>
        )}
    </div>
  </div>
);

export default ActiveQuiz;
