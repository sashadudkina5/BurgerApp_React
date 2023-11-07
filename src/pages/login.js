import React from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { onLogin } from "../utils/onLogin";
import { useSelector } from "react-redux";
import { getUserError, getLoggedInStatus } from "../redux_services/selectors";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getLoggedInStatus);

  const registerError = useSelector(getUserError);

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

  const loginData = {
    email: emailValue,
    password: passwordValue,
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"name"}
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
          name={"name"}
          error={false}
          ref={inputPasswordRef}
          onIconClick={onIconClickPassword}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => onLogin(loginData)}
        >
          Войти
        </Button>

        {isLoggedIn && navigate("/")}

        {registerError && <p>{registerError}</p>}

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link to="/register">
            <p className="text text_type_main-default">Зарегистрироваться</p>
          </Link>
        </div>

        <div className={`mt-4 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password">
            <p className="text text_type_main-default">Восстановить пароль</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
