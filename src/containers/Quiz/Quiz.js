import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { 
	fetchQuizById,
	quizAnswerHandler,
	nextAnswerClick,
	onSuccessAnswer,
	retryQuiz
} from "../../store/actions/quiz";

class Quiz extends Component {

	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.retryQuiz();
	}

	render() {

		return (
			<div className="Quiz">
				<div className="QuizWrapper">
					{
						this.props.loading || !this.props.quiz
						? <Loader />
						: this.props.isFinished
							? <FinishedQuiz
									results={this.props.results}
									quiz={this.props.quiz}
									onRetry={this.props.retryQuiz}
								/>
							: <>
								<h1>Ответьте на все вопросы</h1>
								<ActiveQuiz
								answers={this.props.quiz[this.props.activeQuestion].answers}
								question={this.props.quiz[this.props.activeQuestion].question}
								handleAnswer={this.props.quizAnswerHandler}
								onAnswerNext={this.props.nextAnswerClick}
								onAnswerSuccess={this.props.onSuccessAnswer}
								questionLength={this.props.quiz.length}
								answerNumber={this.props.activeQuestion + 1}
								stateAnswer={this.props.answerState}
								state={this.props.answerStateQuestion}
								answerNext={this.props.answerNext}
								answerNextBtn={this.props.answerNextBtn}
								answerTotal={this.props.answerTotal}
								/>
								</>
						}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
 return {
	results: state.quiz.results,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  answerNext: state.quiz.answerNext,
  answerStateQuestion: state.quiz.answerStateQuestion,
  answerNextBtn: state.quiz.answerNextBtn,
  answerTotal: state.quiz.answerTotal,
  quiz: state.quiz.quiz,
  loading: state.quiz.loading
 }
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerHandler: answerId => dispatch(quizAnswerHandler(answerId)),
		nextAnswerClick: () => dispatch(nextAnswerClick()),
		onSuccessAnswer: answerId => dispatch(onSuccessAnswer(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);