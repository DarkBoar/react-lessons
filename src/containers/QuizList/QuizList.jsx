import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {
  renderQuizes = () => this.props.quizes.map((quiz) => (
    <li key={quiz.id}>
      <NavLink to={`/quiz/${quiz.id}`}>
        {quiz.name}
      </NavLink>
    </li>
  ))

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    const { loading, quizes } = this.props;
    return (
      <div className={classes.QuizList}>
        <div className={classes.quizContainer}>
          <h1>Список тестов</h1>
          <p>Пройдите тесты</p>
          { loading && quizes.length !== 0
            ? <Loader />
            : (
              <ul>
                {this.renderQuizes()}
              </ul>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToPorps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}

function mapDispatchToPorps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}

export default connect(mapStateToPorps, mapDispatchToPorps)(QuizList);
