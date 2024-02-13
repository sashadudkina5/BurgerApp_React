import { configureStore } from "@reduxjs/toolkit";
import { wsReducer } from "./web-socket-reducer";
import { connect, connected, disconnected, connectError, getMessage } from "./web-socket-actions";

describe("WebSocket Reducer", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { ws: wsReducer },
    });
  });

  it("should handle WS_CONNECTION_START action", () => {
    store.dispatch(connect("ws://example.com"));

    const state = store.getState().ws;

    expect(state.wsConnectingLoading).toBe(true);
  });

  it("should handle WS_CONNECTION_SUCCESS action", () => {
    store.dispatch(connected());

    const state = store.getState().ws;

    expect(state.wsConnected).toBe(true);
    expect(state.wsConnectingLoading).toBe(false);
    expect(state.error).toBe("");
  });

  it("should handle WS_CONNECTION_CLOSED action", () => {
    store.dispatch(disconnected());

    const state = store.getState().ws;

    expect(state.wsConnected).toBe(false);
    expect(state.wsConnectingLoading).toBe(false);
  });

  it("should handle WS_CONNECTION_ERROR action", () => {
    const errorMessage = "Connection error";
    store.dispatch(connectError(errorMessage));

    const state = store.getState().ws;

    expect(state.wsConnected).toBe(false);
    expect(state.wsConnectingLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it("should handle WS_GET_MESSAGE action", () => {
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

    store.dispatch(getMessage(messagePayload));

    const state = store.getState().ws;

    expect(state.getData).toEqual(messagePayload);
    expect(state.wsConnected).toBe(true);
    expect(state.wsConnectingLoading).toBe(false);
    expect(state.error).toBe("");
  });
});
