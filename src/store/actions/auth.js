import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR, AUTH_DISABLE_ERROR } from "./actionTypes";

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHhnwoRYlS3nePNyT5c9ZcixVvCjrqtSQ';

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHhnwoRYlS3nePNyT5c9ZcixVvCjrqtSQ';
    }

    await axios.post(url, authData)
      .then(response => {
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('nameUser', data.email);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken, data.email));
        dispatch(autoLogout(data.expiresIn));
      })
      .catch(error => {
        // console.log(error.response.data.error)
        const errorMessage = error.response.data.error.message
        dispatch(authError(errorMessage))
      })
  }
}

export function authError(errorMessage) {
  return {
    type: AUTH_ERROR,
    errorMessage
  }
}

export function disableErrorMessage() {
  return {
    type: AUTH_DISABLE_ERROR
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('nameUser');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    const isNameLogin = localStorage.getItem('nameUser');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, isNameLogin));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}

export function authSuccess(token, isNameLogin) {
  return {
    type: AUTH_SUCCESS,
    token,
    isNameLogin
  }
}