import axios from "axios";
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./actionTypes";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finishCreateQuiz(nameQuiz) {
  return async (dispatch, getState) => {
    const quiz = {name: nameQuiz, quizes: getState().create.quiz}
    await axios.post('https://react-quiz-bc71e.firebaseio.com/quizes.json', quiz);
    dispatch(resetQuizCreation());
  }
}