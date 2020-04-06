import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR, AUTH_DISABLE_ERROR } from "../actions/actionTypes";

const initialState = {
  token: null,
  isNameLogin: null,
  errorMessage: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        isNameLogin: action.isNameLogin,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        isNameLogin: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case AUTH_DISABLE_ERROR:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
}
