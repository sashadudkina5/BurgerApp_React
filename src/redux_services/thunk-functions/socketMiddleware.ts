import type { Middleware } from "redux";
import type { RootState } from "../../utils/types";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export type WSActionTypes = {
  disconnected: ActionCreatorWithoutPayload;
  connect: ActionCreatorWithPayload<string>;
  connecting?: ActionCreatorWithoutPayload;
  connected: ActionCreatorWithoutPayload;
  connectError: ActionCreatorWithPayload<string>;
  getMessage: ActionCreatorWithPayload<any>;
  sendMessage?: ActionCreatorWithPayload<any>;
};

let connectionState = {
  isConnected: false,
  isConnecting: false,
  hasError: false,
};

export const socketMiddleware = (
  wsActions: WSActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        disconnected,
        connect,
        connected,
        connectError,
        getMessage,
        sendMessage,
      } = wsActions;
      if (connect.match(action)) {
        connectionState = {
          isConnected: false,
          isConnecting: true,
          hasError: false,
        };
        url = action.payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          connectionState = { isConnected: true, isConnecting: false, hasError: false };
          dispatch(connected());
        };

        socket.onerror = (event) => {
          console.error("WebSocket connection error:", event);
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(getMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            connectionState = { isConnected: false, isConnecting: false, hasError: true };
            dispatch(connectError(`Closed with code: ${event.code}`));
          } else {
            connectionState = { isConnected: false, isConnecting: false, hasError: false };
            dispatch(disconnected());
          }
        };

        if (disconnected.match(action)) {
          socket.close();
        }

        if (sendMessage?.match(action)) {
          const payload = action.payload;
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
