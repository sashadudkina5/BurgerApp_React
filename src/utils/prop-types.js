import PropTypes from "prop-types";

// function to check prop types of an array
export function applyPropTypesToArray(component, propArrayName) {
  component.propTypes = {
    [propArrayName]: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  };
}

export function applyPropTypesToComponent(component) {
  component.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };
}
