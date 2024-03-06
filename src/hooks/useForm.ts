import React from "react";

/**
 * Custom React hook that manages form state. 
 * It initializes form fields with default values and provides a method to update these values based on user input.
 * 
 * @param {Object} inputValues - Initial values for form fields with keys representing the field names and their corresponding values. 
 * Default values are for email, password, name, token, and newPassword fields.
 * 
 * @returns {Object} An object containing:
 * - values: An object holding the current state of form values.
 * - handleChange: A function to be called on input change events, updating the form values state with the input's current value.
 * - setValues: A function to manually set the form values.
 * 
 * @example
 * const { values, handleChange, setValues } = useForm({ email: '', password: '' });
 * 
 * <input
 *   name="email"
 *   value={values.email}
 *   onChange={handleChange}
 * />
 * 
 * <input
 *   name="password"
 *   value={values.password}
 *   onChange={handleChange}
 * />
 */
export function useForm(inputValues = { email: "", password: "", name: "", token: "", newPassword: "" }) {
    const [values, setValues] = React.useState(inputValues);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
  
    return { values, handleChange, setValues };
  }