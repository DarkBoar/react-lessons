import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from 'react-router-dom';
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {

  renderQuizes = () => {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div className={classes.quizContainer}>
          <h1>Список тестов</h1>
          <p>Пройдите тесты</p>
          { this.props.loading && this.props.quizes.length !== 0
            ? <Loader/>
            : <ul>
                {this.renderQuizes()}
              </ul>
          }
        </div>
      </div>
    );
  }
}

function mapStateToPorps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToPorps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToPorps, mapDispatchToPorps)(QuizList);