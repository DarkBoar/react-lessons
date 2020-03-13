import { AUTH_SUCCESS, AUTH_LOGOUT } from "../actions/actionTypes";

const initialState = {
  token: null,
  isNameLogin: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        isNameLogin: action.isNameLogin
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        isNameLogin: null
      }
    default:
      return state
  }
}