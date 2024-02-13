import userDataReducer from "./reducer";
import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGIN_OUT_SUCCESS,
} from "../types-of-actions";

import {initialState} from "./reducer"

describe('get uder data reducer', () => {
  const registrationData = {
    email: 'test@example.com',
    name: 'John Doe',
  };

  const loginData = {
    email: 'user@example.com',
    name: 'User Name',
  };

  it('should handle GET_REGISTRATION_REQUEST action', () => {
    const action = { type: GET_REGISTRATION_REQUEST };
    const newState = userDataReducer(undefined, action);

    expect(newState.isLoading).toBe(true);
  });

  it('should handle GET_REGISTRATION_SUCCESS action', () => {

    const requestAction = { type: GET_REGISTRATION_REQUEST };
    const requestState = userDataReducer(initialState, requestAction);

    const action = { type: GET_REGISTRATION_SUCCESS, registrationData };
    const newState = userDataReducer(requestState, action);

    expect(newState.userData).toEqual(registrationData);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
  });

  it('should handle GET_REGISTRATION_FAILED action', () => {
    const errorMessage = 'Registration failed';

    const requestAction = { type: GET_REGISTRATION_REQUEST };
    const requestState = userDataReducer(initialState, requestAction);


    const action = { type: GET_REGISTRATION_FAILED, errorMessage };
    const newState = userDataReducer(requestState, action);

    expect(newState.userData).toEqual({ email: '', name: '' });
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  it('should handle GET_LOGIN_REQUEST action', () => {
    const action = { type: GET_LOGIN_REQUEST };
    const newState = userDataReducer(undefined, action);

    expect(newState.isLoading).toBe(true);
  });

  it('should handle GET_LOGIN_SUCCESS action', () => {
    const requestAction = { type: GET_LOGIN_REQUEST };
    const requestState = userDataReducer(initialState, requestAction);

    const action = { type: GET_LOGIN_SUCCESS, loginData };
    const newState = userDataReducer(requestState, action);

    expect(newState.userData).toEqual(loginData);
    expect(newState.isLoading).toBe(false);
    expect(newState.isLoggedIn).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle GET_LOGIN_FAILED action', () => {
    const requestAction = { type: GET_LOGIN_REQUEST };
    const requestState = userDataReducer(initialState, requestAction);

    const errorMessage = 'Login failed';
    const action = { type: GET_LOGIN_FAILED, errorMessage };
    const newState = userDataReducer(requestState, action);

    expect(newState.userData).toEqual({ email: '', name: '' });
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

it('should handle GET_LOGIN_OUT_SUCCESS action', () => {
  const loginRequestAction = { type: GET_LOGIN_REQUEST };
  const loginRequestState = userDataReducer(undefined, loginRequestAction);

  const loginSuccessAction = { type: GET_LOGIN_SUCCESS, loginData };
  const loginSuccessState = userDataReducer(loginRequestState, loginSuccessAction);

  const logoutAction = { type: GET_LOGIN_OUT_SUCCESS };
  const newState = userDataReducer(loginSuccessState, logoutAction);

  expect(newState.userData).toEqual({ email: '', name: '' });
  expect(newState.isLoggedIn).toBe(false);
  expect(newState.isLoading).toBe(false);
})
});