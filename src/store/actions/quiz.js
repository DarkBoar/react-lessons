import axios from "axios";
import { 
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_BUTTON,
  QUIZ_SET_BUTTON_ID,
  QUIZ_FINISHED,
  QUIZ_NEXT_ANSWER,
  QUIZ_SET_STATE,
  QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('https://react-quiz-bc71e.firebaseio.com/quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
			const response = await axios.get(`https://react-quiz-bc71e.firebaseio.com/quizes/${quizId}.json`);
			const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
		} catch (e) {
			dispatch(fetchQuizesError(e));
		}
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function quizAnswerHandler(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerNextBtn) {
      dispatch(quizSetAnswerBtn())
    }
    dispatch(quizSetAnswer(answerId));
  }
}

export function quizSetAnswerBtn() {
  return {
    type: QUIZ_SET_BUTTON
  }
}

export function quizSetAnswer(answerId) {
  return {
    type: QUIZ_SET_BUTTON_ID,
    answerId
  }
}

export function nextAnswerClick() {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (isQuizFinished(state)) {
      dispatch(isFinishQuiz())
		} else {
      dispatch(isNextAnswer(state.activeQuestion + 1))
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export function isFinishQuiz() {
  return {
    type: QUIZ_FINISHED
  }
}

export function isNextAnswer(number) {
  return {
    type: QUIZ_NEXT_ANSWER,
    number
  }
}

export function onSuccessAnswer(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    const question = state.quiz[state.activeQuestion];
		const results = state.results;
		
		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success';
      }
      dispatch(quizSetState({ [answerId]: 'success' }, 'success', results));
		} else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, 'error', results));
		}
  }
}

export function quizSetState(answerState, answerTotal, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    answerTotal,
    results
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}

