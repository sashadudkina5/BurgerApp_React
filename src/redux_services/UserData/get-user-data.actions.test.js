import {
    getRegistrationRequest,
    getRegistrationSuccess,
    getRegistrationFailed,
    getLoginRequest,
    getLoginSuccess,
    getLoginFailed,
    getLogOutSuccess
  } from './actions';

  import {
    GET_REGISTRATION_REQUEST,
    GET_REGISTRATION_SUCCESS,
    GET_REGISTRATION_FAILED,
    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILED,
    GET_LOGIN_OUT_SUCCESS,
  } from "../types-of-actions";
  
  describe('User Data Actions', () => {

    const registrationData = {
        email: 'test@example.com',
        name: 'John Doe',
      };
    
      const loginData = {
        email: 'user@example.com',
        name: 'User Name',
      };

    it('should create an action for registration request', () => {
      const action = getRegistrationRequest();
      const expectedAction = {
        type: GET_REGISTRATION_REQUEST,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for registration success', () => {
      const action = getRegistrationSuccess(registrationData);
      const expectedAction = {
        type: GET_REGISTRATION_SUCCESS,
        registrationData,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for registration failure', () => {
      const error = { message: 'Registration error occurred' };
      const action = getRegistrationFailed(error);
      const expectedAction = {
        type: GET_REGISTRATION_FAILED,
        errorMessage: error.message,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for login request', () => {
      const action = getLoginRequest();
      const expectedAction = {
        type: GET_LOGIN_REQUEST,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for login success', () => {
      const action = getLoginSuccess(loginData);
      const expectedAction = {
        type: GET_LOGIN_SUCCESS,
        loginData,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for login failure', () => {
      const error = { message: 'Login error occurred' };
      const action = getLoginFailed(error);
      const expectedAction = {
        type: GET_LOGIN_FAILED,
        errorMessage: error.message,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for logout success', () => {
      const action = getLogOutSuccess();
      const expectedAction = {
        type: GET_LOGIN_OUT_SUCCESS,
      };
      expect(action).toEqual(expectedAction);
    });
  });
  