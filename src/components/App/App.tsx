import { useEffect } from "react";
import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import IngredientDetail from "../IngredientDetail/IngredientDetail";
import { hideIngredientDetails } from "../IngredientDetail/actions";
import { getIngredientDetails } from "../../redux_services/selectors";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { getSelectedOrder } from "../../redux_services/selectors";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ResetPasswordPage from "../../pages/reset-password";
import ForgotPasswordPage from "../../pages/forgot-password";
import ProfilePage from "../../pages/profile";
import OrderFeed from "../../pages/order-feed";
import ProtectedRouteElement from "../ProtectedRouteElement";
import { getUserInfoThunk } from "../../redux_services/thunk-functions/GetUserInfo";
import IngredientDetailPageOpened from "../../pages/ingredients-id";
import { fetchIngredients } from "../../redux_services/thunk-functions/FetchIngredients";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";
import DoneOrderDetails from "../DoneOrderDetails/DoneOrderDetails";
import OrderDetailPageOpened from "../../pages/feed-order-details-id";
import { hideDoneOrderDetails } from "../DoneOrderDetails/actions";
import UserOrdersPage from "../../pages/user-orders";
import MainPage from "../../pages/main-page";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound404 } from "../../pages/not-found404";

/**
 * The main application component for the Burger Builder application.
 * It provides routing for the application using React Router and manages modal states
 * for displaying ingredient details and order details. It also initializes global
 * state management for user information, detects if the used is authorized, and fetches the list of ingredients.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state = location.state || {};
  const backgroundLocation = state.backgroundLocation;
  const navigate = useNavigate();

  /**
   * Closes open modal with ingredient details and changes URL
   */
  function onDismissIngredientDetails() {
    navigate(-1);
    dispatch(hideIngredientDetails());
  }

  /**
   * Closes open modal with order number after the order is sent and changes URL
   */
  function onDismissDoneOrderDetails() {
    navigate(-1);
    dispatch(hideDoneOrderDetails());
  }

  /**
   * The ingredient object that was clicked on. The data is fetched from redux store
   */
  const selectedIngredient = useAppSelector(getIngredientDetails);

  /**
   * The order object that was clicked on. The data is fetched from redux store
   */
  const selectedOrder = useAppSelector(getSelectedOrder);

  /**
   * useEffect hook for fetching ingredients when the component mounts.
   */
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  /**
   * useEffect hook for fetching user information when the component mounts.
   * Detects if the user is authorized and fetches user data to redux store
   */
  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, []);

  return (
    <div className={appStyles.App}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/feed" element={<OrderFeed />} />
          <Route path="*" element={<NotFound404 />} />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRouteElement>
                <UserOrdersPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile/order/:id"
            element={
              <ProtectedRouteElement>
                <OrderDetailPageOpened path="/profile/order/:id" />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/ingredients/:id"
            element={<IngredientDetailPageOpened />}
          />
          <Route
            path="/feed/:id"
            element={<OrderDetailPageOpened path="/feed/:id" />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />
          <Route path="/" element={<MainPage />} />
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  title={"Детали ингредиента"}
                  onClose={onDismissIngredientDetails}
                >
                  <IngredientDetail selectedIngredient={selectedIngredient} />
                </Modal>
              }
            />

            <Route
              path="/feed/:id"
              element={
                <Modal title={""} onClose={onDismissDoneOrderDetails}>
                  <DoneOrderDetails matchingOrder={selectedOrder} />
                </Modal>
              }
            />

            <Route
              path="/profile/order/:id"
              element={
                <Modal title={""} onClose={onDismissDoneOrderDetails}>
                  <DoneOrderDetails matchingOrder={selectedOrder} />
                </Modal>
              }
            />
          </Routes>
        )}
      </DndProvider>
    </div>
  );
}

export default App;
