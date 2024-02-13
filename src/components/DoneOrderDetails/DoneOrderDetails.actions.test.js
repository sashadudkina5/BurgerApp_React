import {
    showDoneOrderDetails,
    hideDoneOrderDetails,
    reopenDoneOrderDetails
  } from './actions';

  import {
    SHOW_ORDER_DETAILS,
    HIDE_ORDER_DETAILS,
    REOPEN_ORDER_DETAILS
  } from "../../redux_services/types-of-actions";
  
  describe('Done Order Details Actions', () => {
    const selectedOrder = {
        ingredients: ["ingredient1", "ingredient2"],
        _id: "some_id",
        status: "pending",
        number: 1,
        createdAt: "2022-01-01",
        updatedAt: "2022-01-02",
        name: "Some Order Name",
      };

    it('should create an action to show order details', () => {

      const action = showDoneOrderDetails(selectedOrder);
      const expectedAction = {
        type: SHOW_ORDER_DETAILS,
        selectedOrder,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action to hide order details', () => {
      const action = hideDoneOrderDetails();
      const expectedAction = {
        type: HIDE_ORDER_DETAILS,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action to reopen order details', () => {
      const action = reopenDoneOrderDetails(selectedOrder);
      const expectedAction = {
        type: REOPEN_ORDER_DETAILS,
        selectedOrder,
      };
      expect(action).toEqual(expectedAction);
    });
  });
  