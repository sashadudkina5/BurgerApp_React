import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerThunk } from "../redux_services/thunk-functions/registration";
import { useNavigate } from "react-router-dom";
import {
  getUserEmail,
  getUserError,
  getLoggedInStatus,
  getLoginLoading,
} from "../redux_services/selectors";
import { Navigate } from "react-router";
import { TSubmitHandler } from "../utils/types";
import { useForm } from "../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

/**
 * Allows new users to register by providing their name, email, and password.
 * Upon successful registration, it navigates the user to the main page.
 *
 * @component
 * @example
 * return <RegisterPage />
 */
function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //Upon successful registration, it navigates the user to the main page.
  const userEmail = useAppSelector(getUserEmail);
  let isRegistered: boolean = false;
  if (userEmail === "") {
    isRegistered = false;
  } else {
    isRegistered = true;
  }

  // State for toggling password visibility
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  // Refs for input focus
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const inputEmailRef = React.useRef<HTMLInputElement>(null);

  // Registration error and loading states
  const registerError = useAppSelector(getUserError);
  const registerLoading = useAppSelector(getLoginLoading);

  // Handle input focus and toggle password visibility
  const onIconClickName = () => {
    setTimeout(() => inputNameRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };
  const onIconClickPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onIconClickEmail = () => {
    setTimeout(() => inputEmailRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  // Form state management through custom hook
  const { values, handleChange } = useForm();

  /**
   * If already logged in, navigates to the `MainPage`
   */
  const isLoggedIn = useAppSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  /**
   * Submits registration data and stores name and email in redux store
   * @param e - defualt event
   */
  const handleFormSubmit: TSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerThunk(values));
  };

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Регистрация
        </h1>
        <form onSubmit={handleFormSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            ref={inputNameRef}
            onIconClick={onIconClickName}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            error={false}
            ref={inputEmailRef}
            onIconClick={onIconClickEmail}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            value={values.password}
            name={"password"}
            error={false}
            ref={inputPasswordRef}
            onIconClick={onIconClickPassword}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          {registerLoading &&
            (values.email || values.password || values.name) && (
              <p className="text text_type_main-default mb-8">Loading...</p>
            )}

          {registerError?.includes("User already exists") && (
            <p className="text text_type_main-default mb-8">
              Пользователь с такой почтой уже зарегистрирован
            </p>
          )}

          {registerError?.includes(
            "Email, password and name are required fields"
          ) &&
            [values.email, values.password, values.name].filter(
              (value) => !value
            ).length > 0 &&
            [values.email, values.password, values.name].filter(
              (value) => !value
            ).length < 3 && (
              <p className="text text_type_main-default mb-8">
                Убедитесь, что заполнены все поля
              </p>
            )}

          {registerError?.includes("Unexpected token") && (
            <p className="text text_type_main-default mb-8">
              Ошибка при регистрации. Пожалуйста повторите попытку позже
            </p>
          )}

          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>

          {isRegistered && navigate("/")}
        </form>

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login" className={styles.link}>
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
