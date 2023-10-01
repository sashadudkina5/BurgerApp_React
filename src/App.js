import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/appHeader";
import BurgerIngredients from "./components/BurgerIngredients/burgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/burgerConstructor";
import Modal from "./components/Modal/modal";
import OrderDetails from "./components/OrderDetails/orderDetails"
import IngredientDetail from "./components/IngredientDetail/ingredientDetail"

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((ingredientsData) => {
        setIngredients(ingredientsData.data);
      })
      .catch((err) => {
        setError("Не удалось загрузить страницу, попробуйте позже");
      });
  }, []);

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailModalOpen, setIsIngredientDetailModalOpen] = useState(false);

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
            <BurgerIngredients ingredients={ingredients} onClick={openIngredientDetailModal}/>
            <BurgerConstructor
              ingredients={ingredients}
              onClick={openOrderDetailsModal}
            />
            <Modal title={""} isOpen={isOrderDetailsModalOpen} onClose={closeOrderDetailsModal}>
              <OrderDetails />
            </Modal>
            <Modal title={"Детали ингредиента"} isOpen={isIngredientDetailModalOpen} onClose={closeIngredientDetailModal}>
              <IngredientDetail ingredient={selectedIngredient}/>
            </Modal>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
