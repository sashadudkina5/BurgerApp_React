import burgerIngredientsStyles from "./burgerIngredients.module.css";
import MockData from '../../utils/utils'
import Tabs from '../Tabs/tabs'
import ProductCard from '../ProductCard/productCard'

function BurgerIngredients () {
    const mockDataInstance = new MockData();
    const ingredients = mockDataInstance.state.ingredients; 
    const bunIngredients = ingredients.filter((ingredient) => ingredient.type === 'bun');
    const sauceIngredients = ingredients.filter((ingredient) => ingredient.type === 'sauce');
    const mainIngredients = ingredients.filter((ingredient) => ingredient.type === 'main');

    return (
        <div className={burgerIngredientsStyles.wrapper}>
        <h1 className={`${burgerIngredientsStyles.title} text text_type_main-large`}>Соберите бургер</h1>
        <Tabs/>
        <section className={burgerIngredientsStyles.section}>
        <h2 className={`${burgerIngredientsStyles.title} text text_type_main-medium`}>Булки</h2>
        <ProductCard typeOfIngredient={bunIngredients}/>

        <h2 className={`${burgerIngredientsStyles.title} text text_type_main-medium`}>Соусы</h2>
        <ProductCard typeOfIngredient={sauceIngredients}/>

        <h2 className={`${burgerIngredientsStyles.title} text text_type_main-medium`}>Начинка</h2>
        <ProductCard typeOfIngredient={mainIngredients}/>
        </section>

        </div>
    )
}

export default BurgerIngredients;