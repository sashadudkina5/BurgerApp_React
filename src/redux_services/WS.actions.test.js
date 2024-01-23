import {
    connect,
    connecting,
    connected,
    connectError,
    getMessage,
    disconnected
  } from './web-socket-actions';

  import { WS_CONNECTION_START,
    WS_CONNECTION_REQUEST,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED } from "./types-of-actions"
  
  describe('WebSocket Actions', () => {
    it('should create an action to start WebSocket connection', () => {
      const endpoint = 'ws://example.com';
      const action = connect(endpoint);
      const expectedAction = {
        type: WS_CONNECTION_START,
        payload: endpoint,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for WebSocket connection request in process', () => {
      const action = connecting();
      const expectedAction = {
        type: WS_CONNECTION_REQUEST,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for successful WebSocket connection', () => {
      const action = connected();
      const expectedAction = {
        type: WS_CONNECTION_SUCCESS,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for WebSocket connection error', () => {
      const errorMessage = 'Connection error';
      const action = connectError(errorMessage);
      const expectedAction = {
        type: WS_CONNECTION_ERROR,
        payload: errorMessage,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action to get a message from WebSocket', () => {
        const messagePayload = {
            success: true,
            orders: [{
              ingredients: ["ingredient1", "ingredient2"],
              _id: "1",
              status: "pending",
              number: 1,
              createdAt: "2024-01-01T00:00:00.000Z",
              updatedAt: "2024-01-01T00:00:00.000Z",
              name: "Order 1",
            }],
            total: 1,
            totalToday: 1,
          };
      const action = getMessage(messagePayload);
      const expectedAction = {
        type: WS_GET_MESSAGE,
        payload: messagePayload,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for WebSocket connection closed', () => {
      const action = disconnected();
      const expectedAction = {
        type: WS_CONNECTION_CLOSED,
      };
      expect(action).toEqual(expectedAction);
    });
  });
  