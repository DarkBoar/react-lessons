import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Axios from "axios";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null,
		answerNext: false,
		answerStateQuestion: null,
		answerNextBtn: false,
		quiz: [],
		loading: true
	}

	onAnswerClickHandler = (answerId) => {
		this.setState({
			answerNext: true,
			answerState: answerId
		})
	}

	onAnswerSuccess = (answerId) => {
		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;
		
		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success';
			}
			this.setState({
				answerStateQuestion: { [answerId]: 'success' },
				results,
			})
		} else {
			results[question.id] = 'error';
			this.setState({
				answerStateQuestion: { [answerId]: 'error' },
				results,
			})
		}
		this.setState({
			answerNextBtn: true
		})
	}

	onAnswerClickNext = () => {
		if (this.isQuizFinished()) {
			this.setState({
				isFinished: true,
			})
		} else {
			this.setState({
				activeQuestion: this.state.activeQuestion + 1,
				answerState: null,
			})
		}
		this.setState({
			answerNextBtn: false,
			answerNext: false,
		})
	}


	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	retryHandler = () => {
		this.setState({
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			results: {}
		})
	}

	async componentDidMount() {
		try {
			const response = await Axios.get(`https://react-quiz-bc71e.firebaseio.com/quizes/${this.props.match.params.id}.json`);
			const quiz = response.data;

			this.setState({
				quiz,
				loading: false
			})
		} catch (e) {
			console.log(e);
		}
	}

	render() {

		return (
			<div className="Quiz">
				<div className="QuizWrapper">
					{
						this.state.loading
						? <Loader />
						: this.state.isFinished
							? <FinishedQuiz
									results={this.state.results}
									quiz={this.state.quiz}
									onRetry={this.retryHandler}
								/>
							: <>
								<h1>Ответьте на все вопросы</h1>
								<ActiveQuiz
								answers={this.state.quiz[this.state.activeQuestion].answers}
								question={this.state.quiz[this.state.activeQuestion].question}
								handleAnswer={this.onAnswerClickHandler}
								onAnswerNext={this.onAnswerClickNext}
								onAnswerSuccess={this.onAnswerSuccess}
								questionLength={this.state.quiz.length}
								answerNumber={this.state.activeQuestion + 1}
								stateAnswer={this.state.answerState}
								state={this.state.answerStateQuestion}
								answerNext={this.state.answerNext}
								answerNextBtn={this.state.answerNextBtn}
								/>
								</>
						}
				</div>
			</div>
		)
	}
}

export default Quiz;