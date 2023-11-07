import React from "react";
import styles from "./pages.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserInfo} from "../utils/getUserInfo";

function ProfilePage() {

    getUserInfo().then(userInfo => {
        if (userInfo) {
          const userEmail = userInfo.email;
          const userName = userInfo.name;
          setEmailValue(userEmail);
          setNameValue(userName);
        } else {
          console.error("Failed to get user information");
        }
      }).catch(err => {
        console.error("An unexpected error occurred:", err.message);
      });

  const [emailValue, setEmailValue] = React.useState("");
  const inputEmailRef = React.useRef(null);
  const onIconClickEmail = () => {
    setTimeout(() => inputEmailRef.current.focus(), 0);
  };

  const [NameValue, setNameValue] = React.useState("");
  const inputNameRef = React.useRef(null);
  const onIconClickName = () => {
    setTimeout(() => inputNameRef.current.focus(), 0);
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
            <p className="text text_type_main-medium">Выход</p>
          </li>
        </ul>

        <p className="text text_type_main-default text_color_inactive" style={{ textAlign: 'left'}}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setNameValue(e.target.value)}
          icon={"EditIcon"}
          value={NameValue}
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
          onChange={(e) => setEmailValue(e.target.value)}
          icon={"EditIcon"}
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
          icon={"EditIcon"}
          value={""}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
      </div>
    </div>
  );
}

export default ProfilePage;
