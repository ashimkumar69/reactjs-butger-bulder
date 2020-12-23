import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzcrcWrLa2STUts1UvTY5RCazwvpb7dT0";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzcrcWrLa2STUts1UvTY5RCazwvpb7dT0";
    }
    axios
      .post(url, authData)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (!token) {
      dispatch(logout());
    } else if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
