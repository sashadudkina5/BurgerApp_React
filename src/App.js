import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/appHeader";
import BurgerIngredients from "./components/BurgerIngredients/burgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/burgerConstructor";
import Modal from "./components/Modal/modal";
import OrderDetails from "./components/OrderDetails/orderDetails";
import IngredientDetail from "./components/IngredientDetail/ingredientDetail";
import { getIngredients } from "./utils/burger-api";
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed
} from "./redux_services/ingredients/actions";
import {
  showIngredientDetails,
  hideIngredientDetails
} from "./components/IngredientDetail/actions";
import { useDispatch, useSelector } from "react-redux";
import {getListOfIngredients} from "./redux_services/selectors";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {createOrder} from "../src/components/OrderDetails/thunk";
import { getConstructorIngredients, getBunData } from "../src/redux_services/selectors";


function App() {

  const dispatch = useDispatch();

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);


  const ingredientsState = useSelector(getListOfIngredients);
  const { ingredientsData, isLoading, error, isIngredientDetailModalOpen} = ingredientsState;

  const data = useSelector(getConstructorIngredients);
  const bunData = useSelector(getBunData);


  const getIngredientIDs = () => {
    const innerIngredientIDs = data.map(item => item.ingredient._id);
    const idValue = bunData.ingredient._id;
    const bunIDs = [idValue];
    const ingredientIDs = innerIngredientIDs.concat(bunIDs, bunIDs);
  
    return {
      ingredients: ingredientIDs
    };
  }
  


  useEffect(() => {

    dispatch(getIngredientsRequest());
  
    getIngredients()
      .then(ingredientsData => {
        dispatch(getIngredientsSuccess(ingredientsData));
      })
      .catch(error => {
        console.log(error);
        dispatch(getIngredientsFailed(error.message));
      });
  }, [dispatch]);

const openOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(true);
    createOrder(getIngredientIDs());
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false);
  };


const openIngredientDetailModal = (ingredient) => {
 dispatch(showIngredientDetails(ingredient))
}

  if (isLoading) {
    return <p>Loading...</p>;
  }

if (error) {
    return <p>Произошла ошибка: {error}</p>;
  } 


  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className="mainWrapper">
          <>
            <BurgerIngredients
              ingredients={ingredientsData.data}
              onClick={openIngredientDetailModal}
            />
            <BurgerConstructor
              ingredients={ingredientsData.data}
              onClick={openOrderDetailsModal}
            /> 
            
            {isOrderDetailsModalOpen && (
              <Modal title={""} onClose={closeOrderDetailsModal}>
                <OrderDetails />
              </Modal>
            )}
            {isIngredientDetailModalOpen && (
              <Modal
                title={"Детали ингредиента"}
                onClose={() => dispatch(hideIngredientDetails())}
              >
                <IngredientDetail />
              </Modal> 
            )}
          </>
      </main>
      </DndProvider>
    </div>
  );
}

export default App;
