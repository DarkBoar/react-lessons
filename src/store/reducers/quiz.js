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
} from "../actions/actionTypes";


const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  answerNext: false,
  answerStateQuestion: null,
  answerNextBtn: false,
  answerTotal: null,
  quiz: null
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz
      }
    case QUIZ_SET_BUTTON:
      return {
        ...state,
        answerTotal: null
      }
    case QUIZ_SET_BUTTON_ID:
      return {
        ...state,
        answerNext: true,
        answerState: action.answerId
      }
    case QUIZ_FINISHED:
      return {
        ...state,
        isFinished: true
      }
    case QUIZ_NEXT_ANSWER:
      return {
        ...state,
        activeQuestion: action.number,
        answerState: null,
        answerNextBtn: false,
        answerNext: false,
        answerTotal: null
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerStateQuestion: action.answerState,
        answerTotal: action.answerTotal,
        results: action.results,
        answerNextBtn: true
      }
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerStateQuestion: null,
        answerTotal: null,
        answerNextBtn: false,
        answerState: null,
        isFinished: false,
        results: {},
      }
    default:
      return state
  }
}