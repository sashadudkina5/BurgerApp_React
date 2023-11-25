import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./appHeader.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <div className={appHeaderStyles.header}>
      <div className={appHeaderStyles.navBar}>
        <NavLink
          to={"/"}
          className={appHeaderStyles.link}
          activeClassName={appHeaderStyles.activeLink}
        >
          <BurgerIcon type="secondary" className={appHeaderStyles.icon} />
          <p
            className={`text text_type_main-default text_color_inactive ${appHeaderStyles.linkText}`}
          >
            Конструктор
          </p>
        </NavLink>

        <NavLink
          to={"/profile/orders"}
          className={appHeaderStyles.link}
          activeClassName={appHeaderStyles.activeLink}
        >
          <ListIcon type="secondary" className={appHeaderStyles.icon} />
          <p
            className={`text text_type_main-default text_color_inactive ${appHeaderStyles.linkText}`}
          >
            Лента заказов
          </p>
        </NavLink>
      </div>

      <Logo />

      <NavLink
        to={"/profile"}
        className={appHeaderStyles.link}
        activeClassName={appHeaderStyles.activeLink}
      >
        <ProfileIcon type="secondary" className={appHeaderStyles.icon} />
        <p
          className={`text text_type_main-default text_color_inactive ${appHeaderStyles.linkText}`}
        >
          Личный кабинет
        </p>
      </NavLink>
    </div>
  );
}

export default AppHeader;
