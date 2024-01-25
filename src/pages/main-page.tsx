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
} from "../redux_services/selectors";
import { createOrderThunk } from "../redux_services/thunk-functions/SendNewOrder";
import { useNavigate } from "react-router-dom";
import { cleanConstructor } from "../components/BurgerConstructor/actions";
import { cleanOrderID } from "../components/OrderDetails/actions";
import { showIngredientDetails } from "../components/IngredientDetail/actions";
import appStyles from "./styles/main-page.module.css";

function MainPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const data: IAllIngredientsConstructor = useAppSelector(
    getConstructorIngredients
  );
  const bunData = useAppSelector(getBunData);
  const isAuth = useAppSelector(getLoggedInStatus);

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

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false);
    dispatch(cleanConstructor());
    dispatch(cleanOrderID());
  };

  const openIngredientDetailModal = (ingredient: IIngredientCard) => {
    dispatch(showIngredientDetails(ingredient));
  };

  const ingredientsState = useAppSelector(getListOfIngredients);
  const { ingredientsData, isLoading, error } = ingredientsState;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Произошла ошибка: {error}</p>;
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
