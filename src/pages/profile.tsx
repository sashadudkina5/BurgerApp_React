import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getUserData,
  getChangeProfileInfoStatus,
} from "../redux_services/selectors";
import { useState, useEffect } from "react";
import { changeUserInfoThunk } from "../redux_services/thunk-functions/change-profile-info";
import { TSubmitHandler } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import UserProfileMenu from "../components/UserProfileMenu/UserProfileMenu";

function ProfilePage() {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(getUserData);
  const userName: string = userData.name!;
  const userEmail: string = userData.email!;

  const onChangeStatus = useAppSelector(getChangeProfileInfoStatus);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [messageOpacity, setMessageOpacity] = useState(false);

    //for changing password visibility
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const onIconClickPassword = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    const inputRefPassword = React.useRef<HTMLInputElement>(null);


useEffect(() => {
  let timer: any;
  if (showStatus) {
    setMessageOpacity(true);
    timer = setTimeout(() => {
      setMessageOpacity(false); 
    }, 3000);
    const hideTimer = setTimeout(() => {
      setShowStatus(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }
}, [showStatus]);


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

  const handleFormSubmit: TSubmitHandler = (e) => {
    e.preventDefault();
    setIsEmailEditing(false);
    setIsNameEditing(false);
    setIsPasswordEditing(false);
    dispatch(changeUserInfoThunk(changedData));
    setShowStatus(true);
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
      <UserProfileMenu />

      <form onSubmit={handleFormSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
          type={"email"}
          placeholder={"Логин"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
          type={isPasswordVisible ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordValue(e.target.value);
            setIsPasswordEditing(true);
          }}
          onIconClick={onIconClickPassword}
          icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
          value={passwordValue}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          ref={inputRefPassword}
        />
        {(isEmailEditing || isNameEditing || isPasswordEditing) && (
          <div className="mb-4">
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
{showStatus && (
  <p className={`text text_type_main-default mb-8 ${styles.statusMessage} ${messageOpacity ? styles.visible : ''}`}>
    {onChangeStatus}
  </p>
)}

      </form>
    </div>
  );
}

export default ProfilePage;
