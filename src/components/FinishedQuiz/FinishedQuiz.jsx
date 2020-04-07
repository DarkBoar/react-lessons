import React from "react";
import { Link } from "react-router-dom";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((item, key) => {
    let total = item;
    if (props.results[key] === "success") {
      total += 1;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <h2>Ваш результат</h2>
      <p>
        Правильно
        {successCount}
        {" "}
        из
        {props.quiz.length}
      </p>
      <ul>
        {
          props.quiz.map((quizItem, index) => {
            const cls = props.results[quizItem.id] === "error"
              ? <span className={classes.error}>Неправильно</span>
              : <span className={classes.success}>Правильно</span>;
            return (
              <li key={index}>
                {`${index + 1}. `}
                {quizItem.question}
                {cls}
              </li>
            );
          })
        }
      </ul>
      <div className={classes.bottomBtn}>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
        <button onClick={props.onRetry}>Пройти тест еще раз</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
