import React from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { getUserData } from "../redux_services/selectors";
import { useState } from "react";
import { changeUserInfo } from "../utils/change-profile-info";
import { logout } from "../utils/logout";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = (e: React.SyntheticEvent) => {
    logout();
    navigate("/login");
  };

  const userData = useSelector(getUserData);
  const userName: string = userData.name;
  const userEmail: string = userData.email;

  const [emailValue, setEmailValue] = React.useState<string>(userEmail);
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const onIconClickEmail = () => {
    setTimeout(() => inputEmailRef.current?.focus(), 0);
  };
  const [isEmailEditing, setIsEmailEditing] = useState<boolean>(false);

  const [nameValue, setNameValue] = React.useState<string>(userName);
  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const onIconClickName = () => {
    setTimeout(() => inputNameRef.current?.focus(), 0);
  };
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false);

  const [passwordValue, setPasswordValue] = React.useState<string>("*****");
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const onIconClickPassword = () => {
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
  };
  const [isPasswordEditing, setIsPasswordEditing] = useState<boolean>(false);

  interface IСhangedData {
    email: string;
    password: string | number;
    name: string;
  }

  const changedData: IСhangedData = {
    email: emailValue,
    password: passwordValue,
    name: nameValue,
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsEmailEditing(false);
    setIsNameEditing(false);
    setIsPasswordEditing(false);
    changeUserInfo(changedData);
  };

  const handleCancel = () => {
    setEmailValue(userEmail);
    setNameValue(userName);
    setPasswordValue("*****");

    setIsEmailEditing(false);
    setIsNameEditing(false);
    setIsPasswordEditing(false);
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.menu}>
        <ul className={styles.minuList}>
          <li className={styles.item}>
            <p className="text text_type_main-medium">Профиль</p>
          </li>

          <li className={styles.item}>
            <p className="text text_type_main-medium">История заказов</p>
          </li>

          <li className={styles.item}>
            <button type="button" onClick={handleLogout}>
              <p className="text text_type_main-medium">Выход</p>
            </button>
          </li>
        </ul>

        <p
          className="text text_type_main-default text_color_inactive"
          style={{ textAlign: "left" }}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form onSubmit={handleFormSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => {
            setNameValue(e.target.value);
            setIsNameEditing(true);
          }}
          icon={"EditIcon"}
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
          placeholder={"Логин"}
          onChange={(e) => {
            setEmailValue(e.target.value);
            setIsEmailEditing(true);
          }}
          icon={"EditIcon"}
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
          onChange={(e) => {
            setPasswordValue(e.target.value);
            setIsPasswordEditing(true);
          }}
          onIconClick={onIconClickPassword}
          icon={"EditIcon"}
          value={passwordValue}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        {(isEmailEditing || isNameEditing || isPasswordEditing) && (
          <div className={styles.buttonsWrapper}>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancel}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
