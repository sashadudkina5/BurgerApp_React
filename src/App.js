import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/appHeader';
import BurgerIngredients from './components/BurgerIngredients/burgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/burgerConstructor'

function App() {
  return (
    <div className="App">
        <AppHeader />
        <main className="mainWrapper">
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;