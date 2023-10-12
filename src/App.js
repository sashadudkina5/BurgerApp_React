import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/appHeader";
import BurgerIngredients from "./components/BurgerIngredients/burgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/burgerConstructor";
import Modal from "./components/Modal/modal";
import OrderDetails from "./components/OrderDetails/orderDetails";
import IngredientDetail from "./components/IngredientDetail/ingredientDetail";
import { getIngredients } from "./utils/burger-api";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailModalOpen, setIsIngredientDetailModalOpen] = useState(false);

  useEffect(() => {
    getIngredients()
      .then(ingredientsData => {
        setIngredients(ingredientsData);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const openOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(true);
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false);
  };

  const openIngredientDetailModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsIngredientDetailModalOpen(true);
  };

  const closeIngredientDetailModal = () => {
    setSelectedIngredient(null);
    setIsIngredientDetailModalOpen(false);
  };

  return (
    <div className="App">
      <AppHeader />
      <main className="mainWrapper">
        {error ? (
          <p>Произошла ошибка: {error}</p>
        ) : (
          <>
            <BurgerIngredients ingredients={ingredients} onClick={openIngredientDetailModal} />
            <BurgerConstructor ingredients={ingredients} onClick={openOrderDetailsModal} />
            {isOrderDetailsModalOpen && (
              <Modal title={""} onClose={closeOrderDetailsModal}>
                <OrderDetails />
              </Modal>
            )}
            {isIngredientDetailModalOpen && (
              <Modal title={"Детали ингредиента"} onClose={closeIngredientDetailModal}>
                <IngredientDetail ingredient={selectedIngredient} />
              </Modal>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
