
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from "./appHeader.module.css";
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader () {
    return (
    <div className={appHeaderStyles.header}>
        <div className={appHeaderStyles.navBar}>
        <a href='#' className={appHeaderStyles.link}>
        <BurgerIcon type="secondary" className={appHeaderStyles.icon}/>
        <p className="text text_type_main-default text_color_inactive">Конструктор</p>
        </a> 
        <a href='#' className={appHeaderStyles.link}>
        <ListIcon type="secondary" className={appHeaderStyles.icon}/>
        <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
        </a> 
        </div>
    
         <Logo />

         <a href='#' className={appHeaderStyles.link}>
        <ProfileIcon type="secondary" className={appHeaderStyles.icon}/>
        <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
        </a> 
        </div>
        
    )
}

export default AppHeader;