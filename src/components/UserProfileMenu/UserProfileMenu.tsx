import UserProfileMenuStyles from "./UserProfileMenu.module.css";
import { logoutThunk } from "../../redux_services/thunk-functions/logout";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatch-selectos";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getLogOutStatus } from "../../redux_services/selectors";

/**
 * Provides navigation and logout functionality for user profiles. 
 * Renders a list of navigation links allowing the user to go to their profile, view their order history, 
 * and log out.
 * 
 * @component
 * 
 * @example
 * return <UserProfileMenu />;
 */
function UserProfileMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * response of logout request. stores in redux
   */
  const logOutStatus = useAppSelector(getLogOutStatus);

  /**
   * 
   * @param e - default click event
   * logs out the user.
   * deletes user's data from redux store.
   * navigates the user to "login" path
   */
  const handleLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(logoutThunk());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={UserProfileMenuStyles.menu}>
      <ul className={UserProfileMenuStyles.menuList}>
        <NavLink
          to={"/profile"}
          end
          className={({ isActive }) =>
            `${UserProfileMenuStyles.link} ${
              isActive ? UserProfileMenuStyles.link_active : ""
            }`
          }
        >
          <li className={UserProfileMenuStyles.item}>
            <p
              className={`text text_type_main-medium text_color_inactive ${UserProfileMenuStyles.linkText}`}
            >
              Профиль
            </p>
          </li>
        </NavLink>

        <NavLink
          to={"/profile/orders"}
          end
          className={({ isActive }) =>
          `${UserProfileMenuStyles.link} ${
            isActive ? UserProfileMenuStyles.link_active : ""
          }`
        }
        >
          <li className={UserProfileMenuStyles.item}>
          <p
              className={`text text_type_main-medium text_color_inactive ${UserProfileMenuStyles.linkText}`}
            >История заказов</p>
          </li>
        </NavLink>

        <li className={UserProfileMenuStyles.item}>
          <button type="button" onClick={handleLogout} className={UserProfileMenuStyles.logoutButton}>
            <p className="text text_type_main-medium text_color_inactive">Выход</p>
          </button>
        </li>
      </ul>

      <p
        className="text text_type_main-default mb-5"
        style={{ textAlign: "left" }}
      >
        {logOutStatus}
      </p>

      <p
        className="text text_type_main-default text_color_inactive"
        style={{ textAlign: "left" }}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default UserProfileMenu;
