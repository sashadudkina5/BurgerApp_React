import React from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { register } from "../utils/registration";
import { useNavigate } from "react-router-dom";
import { getUserEmail, getUserError, getLoggedInStatus } from "../redux_services/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";


function RegisterPage() {
  const navigate = useNavigate();

  const isRegistered = useSelector(getUserEmail);
  const registerError = useSelector(getUserError);

  const [nameValue, setNameValue] = React.useState("");
  const inputNameRef = React.useRef(null);
  const onIconClickName = () => {
    setTimeout(() => inputNameRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [emailValue, setEmailValue] = React.useState("");
  const inputEmailRef = React.useRef(null);
  const onIconClickEmail = () => {
    setTimeout(() => inputEmailRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const inputPasswordRef = React.useRef(null);
  const onIconClickPassword = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const registrationData = {
    email: emailValue,
    password: passwordValue,
    name: nameValue,
  };

  const isLoggedIn = useSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    register(registrationData);
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
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          name={"name"}
          error={false}
          ref={inputNameRef}
          onIconClick={onIconClickName}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"email"}
          error={false}
          ref={inputEmailRef}
          onIconClick={onIconClickEmail}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />

        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={(e) => setPasswordValue(e.target.value)}
          icon={"ShowIcon"}
          value={passwordValue}
          name={"password"}
          error={false}
          ref={inputPasswordRef}
          onIconClick={onIconClickPassword}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
        >
          Зарегистрироваться
        </Button>
        </form>

        {isRegistered && navigate("/")}

        {registerError && (
            <p>{registerError}</p>
            )}

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login">
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
