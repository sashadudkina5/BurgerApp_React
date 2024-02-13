import doneOrderDetailsReducer from "./reducer";
import {
  SHOW_ORDER_DETAILS,
  HIDE_ORDER_DETAILS,
  REOPEN_ORDER_DETAILS,
} from "../../redux_services/types-of-actions";
import { initialState } from "./reducer";

describe("done order details reducer", () => {
    
  const selectedOrder = {
    ingredients: ["ingredient1", "ingredient2"],
    _id: "some_id",
    status: "pending",
    number: 1,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-02",
    name: "Some Order Name",
  };

  it("should return the initial state", () => {
    expect(doneOrderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SHOW_ORDER_DETAILS action", () => {
    const action = {
      type: SHOW_ORDER_DETAILS,
      selectedOrder,
    };

    const newState = doneOrderDetailsReducer(initialState, action);

    expect(newState.orderDetails).toEqual(selectedOrder);
    expect(newState.isDoneOrderDetailModalOpen).toBe(true);
  });

  it("should handle HIDE_ORDER_DETAILS action", () => {
    const currentState = {
      orderDetails: selectedOrder,
      isDoneOrderDetailModalOpen: true,
    };

    const action = {
      type: HIDE_ORDER_DETAILS,
    };

    const newState = doneOrderDetailsReducer(currentState, action);

    expect(newState.orderDetails).toBeNull();
    expect(newState.isDoneOrderDetailModalOpen).toBe(false);
  });

  it("should handle REOPEN_ORDER_DETAILS action", () => {
    const action = {
      type: REOPEN_ORDER_DETAILS,
      selectedOrder,
    };

    const newState = doneOrderDetailsReducer(initialState, action);

    expect(newState.orderDetails).toEqual(selectedOrder);
    expect(newState.isDoneOrderDetailModalOpen).toBe(true);
  });
});
