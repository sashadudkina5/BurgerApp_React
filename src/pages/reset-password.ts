import React from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedInStatus } from "../redux_services/selectors";
import { resetPassword } from "../utils/reset-password";

export const ResetPasswordPage: React.FC = () => {

  const navigate = useNavigate();

  const [passwordValue, setPasswordValue] = React.useState<string | number>();
  const inputRefPassword = React.useRef<HTMLInputElement>(null);
  const onIconClickPassword = () => {
    setTimeout(() => inputRefPassword.current?.focus(), 0);
  };

  const [tokenValue, setValueToken] = React.useState<number>();
  const inputRefToken = React.useRef<HTMLInputElement>(null);
  const onIconClickToken = () => {
    setTimeout(() => inputRefToken.current?.focus(), 0);
  };

  interface InewPasswordData {
    password: string | number| undefined;
    token: number | undefined,
  } 

  const newPasswordData: InewPasswordData = {
    password: passwordValue,
    token: tokenValue,
   } 


  const isLoggedIn = useSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await resetPassword(newPasswordData);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Восстановление пароля
        </h1>
        <form onSubmit={handleFormSubmit}>
        <Input
          type={"text"}
          placeholder={"Введите новый пароль"}
          onChange={(e) => setPasswordValue(e.target.value)}
          icon={"ShowIcon"}
          value={passwordValue}
          name={"name"}
          error={false}
          ref={inputRefPassword}
          onIconClick={onIconClickPassword}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValueToken(e.target.value)}
          value={tokenValue}
          name={"name"}
          error={false}
          ref={inputRefToken}
          onIconClick={onIconClickToken}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
        >
          Сохранить
        </Button>
        </form>

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login">
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;