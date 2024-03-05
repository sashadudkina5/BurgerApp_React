import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import Modal from "../components/Modal/Modal";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import { IIngredientCard, IAllIngredientsConstructor } from "../utils/types";
import {
  getConstructorIngredients,
  getBunData,
  getLoggedInStatus,
  getListOfIngredients,
  isSeindingOrderError
} from "../redux_services/selectors";
import { createOrderThunk } from "../redux_services/thunk-functions/SendNewOrder";
import { useNavigate } from "react-router-dom";
import { cleanConstructor } from "../components/BurgerConstructor/actions";
import { cleanOrderID } from "../components/OrderDetails/actions";
import { showIngredientDetails } from "../components/IngredientDetail/actions";
import appStyles from "./styles/main-page.module.css";

/**
 * The primary layout for the burger building application.
 * Contains BurgerIngredients and BurgerConstructor components.
 * 
 * @component
 * @example
 * return <MainPage />;
 */
function MainPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Local state to manage the visibility of the OrderDetails modal
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

  /**
   * All ingredients already added to constructor. Excluding buns
   */
  const data: IAllIngredientsConstructor = useAppSelector(
    getConstructorIngredients
  );

  /**
   * Only buns added to constructor
   */
  const bunData = useAppSelector(getBunData);

  /**
   * Checks if the user is logged in 
   */
  const isAuth = useAppSelector(getLoggedInStatus);

  /**
   * Function to construct an array of ingredient IDs for the order
   * @returns {{ingredients: string[]}} An object with a property `ingredients` that is an array of string IDs.
   */
  const getIngredientIDs = () => {
    const innerIngredientIDs =
      data.map((item) => item.ingredientObj!._id) || [];
    const idValue = bunData?._id;
    const bunIDs = [idValue];
    const ingredientIDs = innerIngredientIDs.concat(bunIDs, bunIDs);

    return {
      ingredients: ingredientIDs,
    };
  };

  /**
   * Function to handle the opening of the OrderDetails modal. 
   * It dispatches an action to create an order if the user is authenticated and ingredients are selected. 
   * Otherwise, it navigates to the login page or does nothing.
   */
  const openOrderDetailsModal = () => {
    if (data && data.length > 0 && bunData !== null && isAuth) {
      setIsOrderDetailsModalOpen(true);
      dispatch(createOrderThunk(getIngredientIDs()));
    } else if (!isAuth) {
      navigate("/login");
    } else {
      return null;
    }
  };

  const errorSendingNewOrder = useAppSelector(isSeindingOrderError);

  /**
   * Function to close the modal with order submission status.
   * Cleans constructor area after order submission.
   */
  const closeOrderDetailsModal = () => {
    if (!errorSendingNewOrder) {
        setIsOrderDetailsModalOpen(false);
        dispatch(cleanConstructor());
        dispatch(cleanOrderID());
    }
    else {
        setIsOrderDetailsModalOpen(false);
        dispatch(cleanOrderID());
    }
  };

  /**
   * Opens modal with ingredient details
   * @param ingredient - the ingredient user clicked on
   */
  const openIngredientDetailModal = (ingredient: IIngredientCard) => {
    dispatch(showIngredientDetails(ingredient));
  };

  /**
   * All ingredients in the app
   */
  const ingredientsState = useAppSelector(getListOfIngredients);
  const { ingredientsData, isLoading, error } = ingredientsState;

  if (isLoading) {
    return <p className="text text_type_main-default">Loading...</p>;
  }

  if (error) {
    return <p className="text text_type_main-default">Произошла ошибка: {error}</p>;
  }

  return (
    <main className={appStyles.mainWrapper}>
      <>
        <BurgerIngredients
          ingredients={ingredientsData.data}
          onClick={openIngredientDetailModal}
        />
        <BurgerConstructor onClick={openOrderDetailsModal} />

        {isOrderDetailsModalOpen && (
          <Modal
            title={""}
            onClose={closeOrderDetailsModal}
            extraClass="order_made_open_modal"
          >
            <OrderDetails />
          </Modal>
        )}
      </>
    </main>
  );
}

export default MainPage;
