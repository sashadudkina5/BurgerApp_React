import React, { useState, useEffect } from "react";
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
  getIngredientsFailed,
  showIngredientDetails,
  hideIngredientDetails
} from "./redux_services/ingredients/actions";
import { useDispatch, useSelector } from "react-redux";
import {getListOfIngredients} from "./redux_services/selectors"

function App() {

  const dispatch = useDispatch();

  //const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  // const [isIngredientDetailModalOpen, setIsIngredientDetailModalOpen] =
    //useState(false); 

  const ingredientsState = useSelector(getListOfIngredients);
  const { ingredientsData, isLoading, error, isIngredientDetailModalOpen} = ingredientsState;

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
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false);
  };

  {/* const openIngredientDetailModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsIngredientDetailModalOpen(true);
  }; */}


const openIngredientDetailModal = (ingredient) => {
 dispatch(showIngredientDetails(ingredient))
}

    {/*const closeIngredientDetailModal = () => {
    setSelectedIngredient(null);
    setIsIngredientDetailModalOpen(false);
  };*/}

  if (isLoading) {
    return <p>Loading...</p>;
  }

if (error) {
    return <p>Произошла ошибка: {error}</p>;
  } 


  return (
    <div className="App">
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
    </div>
  );
}

export default App;
