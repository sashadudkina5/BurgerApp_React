import productAddedStyles from "./productAdded.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function ProductAdded (props) {

    return (
           <>
           {props.ingredients.map((ingredient) => (
           <li className={productAddedStyles.listItem}>
            <DragIcon />
          <div key={ingredient._id} className={productAddedStyles.productItem}>
            <img src={ingredient.image}  alt={ingredient.name} width={'80px'} style={{ display: 'block'}}/>
            <p className="text text_type_main-default" style={{ display: 'block', width: 254, textAlign: 'left'}}>{ingredient.name}</p>
            <div> 
             <span  className="text text_type_main-medium">{ingredient.price}</span>
             <CurrencyIcon type="secondary" />
            </div>
            <DeleteIcon />
          </div>
          </li>
        ))}
               </>

        )

}

ProductAdded.propTypes = {
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,  
        price: PropTypes.number.isRequired, 
      })
    ).isRequired, 
};



export default ProductAdded;