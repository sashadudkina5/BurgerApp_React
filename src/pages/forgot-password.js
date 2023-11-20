import React from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import {forgotPassword} from "../utils/forgot-password";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import {getLoggedInStatus} from "../redux_services/selectors";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {

  const navigate = useNavigate();

  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

let emailInfo = {
    email: value,
  }


  const isLoggedIn = useSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(emailInfo);
      navigate("/reset-password");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
        <form onSubmit={handleFormSubmit}>
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />

        <Button htmlType="submit" type="primary" size="large">
        Восстановить
        </Button>
        </form>

        <div className={`mt-20 ${styles.wrapper}`}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to="/login">
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
