import productCardStyles from "./productCard.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function ProductCard (props) {

    return (
        <div className={productCardStyles.product}>
        {props.typeOfIngredient.map((ingredient) => (
          <div key={ingredient._id} className={productCardStyles.productItem}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={ingredient.image}  alt={ingredient.name} width={'220px'} style={{display: 'block', margin: '0 auto'}}/>
            <span> 
            <CurrencyIcon type="secondary"  style={{display: 'block'}}/>
             <span className="text text_type_main-medium">{ingredient.price}</span>
            </span>
            <p className="text text_type_main-default">{ingredient.name}</p>
          </div>
        ))}
      </div>
  )
}

ProductCard.propTypes = {
    typeOfIngredient: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired, 
        price: PropTypes.number.isRequired, 
      })
    ).isRequired,
  };

export default ProductCard;