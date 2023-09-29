import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/appHeader";
import BurgerIngredients from "./components/BurgerIngredients/burgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/burgerConstructor";
import Modal from "./components/Modal/modal";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="App">
      <AppHeader />
      <main className="mainWrapper">
        {error ? (
          <p>Произошла ошибка: {error}</p>
        ) : (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
            <Modal />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
