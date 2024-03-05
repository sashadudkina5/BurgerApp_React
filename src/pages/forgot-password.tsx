import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { forgotPasswordThunk } from "../redux_services/thunk-functions/forgot-password";
import { Navigate } from "react-router";
import {
  getLoggedInStatus,
  getForgotPasswordError,
} from "../redux_services/selectors";
import { useNavigate } from "react-router-dom";
import { TSubmitHandler } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

/**
 * Page to initiate a password recovery process.
 * Users are required to enter their email address to receive password reset instructions.
 *
 * This component checks if the user is already logged in and redirects to the homepage if true.
 * It uses the `forgotPasswordThunk` function to fetch request to the server.
 * Navigates to the `/reset-password` path after form submission
 *
 * @component
 * @example
 * return <ForgotPasswordPage />;
 */
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * Request response. stored in redux
   */
  const error = useAppSelector(getForgotPasswordError);

  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

    /**
   * Helper function to focus the email input field when the icon is clicked.
   */
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  interface IEmailInfo {
    email: string;
  }

  const emailInfo: IEmailInfo = {
    email: value,
  };

  /**
   * checks if the user is logged in.
   * If true, redirects to the homepage 
   */
  const isLoggedIn = useAppSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

    /**
   * Event handler for form submission.
   * Dispatches the forgotPasswordThunk action with the email address.
   *  * Navigates to the `/reset-password` path after form submission
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleFormSubmit: TSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(forgotPasswordThunk(emailInfo));
      navigate("/reset-password");
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
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"email"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          {error && value && (
            <p className="text text_type_main-default mb-8">
              Проблемы с сетью. Повторите попытку позже
            </p>
          )}

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            disabled={!value}
          >
            Восстановить
          </Button>
        </form>

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={styles.link}>
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
