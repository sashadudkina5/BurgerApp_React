import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { loginThunk } from "../redux_services/thunk-functions/OnLogin";
import {
  getUserError,
  getLoggedInStatus,
  getLoginLoading,
} from "../redux_services/selectors";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import { TSubmitHandler } from "../utils/types";
import { useForm } from "../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(getLoggedInStatus);
  const loginError = useAppSelector(getUserError);
  const loginLoading = useAppSelector(getLoginLoading);

  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const onIconClickEmail = () => {
    setTimeout(() => inputEmailRef.current?.focus(), 0);
  };

  //for changing password visibility 
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const onIconClickPassword = () => {
    setIsPasswordVisible(!isPasswordVisible); 
  };
  

  const { values, handleChange } = useForm();

  const handleFormSubmit: TSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginThunk(values));
  };

  if (isLoggedIn) {
    return <Navigate to="/react-project-BurgerApp/" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
        <form onSubmit={handleFormSubmit}>
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
          {loginError?.includes("email or password are incorrect") &&
            values.email &&
            values.password && (
              <p className="text text_type_main-default mb-8">
                Неверный логин или пароль
              </p>
            )}

          {loginError &&
            [values.email, values.password].some((value) => !value) && (
              <p className="text text_type_main-default mb-8">
                Убедитесь, что заполнены все поля
              </p>
            )}

          {loginLoading && (values.email || values.password) && (
            <p className="text text_type_main-default mb-8">Loading...</p>
          )}

          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </form>

        {isLoggedIn && navigate("/react-project-BurgerApp/")}

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link to="/register" className={styles.link}>
            <p className="text text_type_main-default">Зарегистрироваться</p>
          </Link>
        </div>

        <div className={`mt-4 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className={styles.link}>
            <p className="text text_type_main-default">Восстановить пароль</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
