import ingredientDetailStyles from "./ingredientDetail.module.css";

function ingredientDetail({ ingredient }) {
  if (!ingredient) {
    return null; // Return null if no ingredient is selected
  }

  return (
    <div className={ingredientDetailStyles.wrapper}>
      <img
        className={ingredientDetailStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className={ingredientDetailStyles.name}>{ingredient.name}</p>
      <div className={ingredientDetailStyles.details}>
        <ul className={ingredientDetailStyles.detailsList}>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.calories}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.fat}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ingredientDetail;
