import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total;
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <h2>Ваш результат</h2>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      <ul>
        {
          props.quiz.map((quizItem, index) => {
            const cls = props.results[quizItem.id] === 'error'
            ? <span className={classes.error}>Неправильно</span>
            : <span className={classes.success}>Правильно</span>;
            return (
              <li key={index}>
                {quizItem.question}
                {cls}
              </li>
            )
          })
        }
      </ul>
      <div className={classes.bottomBtn}>
        <Link to={'/'}>
          <Button type="success">Перейти в список тестов</Button>
        </Link>
        <div onClick={props.onRetry}>Пройти тест еще раз</div>
      </div>
    </div>
  )
}

export default FinishedQuiz;