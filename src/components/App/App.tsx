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


function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state = location.state || {};
  const backgroundLocation = state.backgroundLocation;
  const navigate = useNavigate();

  function onDismissIngredientDetails() {
    navigate(-1);
    dispatch(hideIngredientDetails());
  }

  function onDismissDoneOrderDetails() {
    navigate(-1);
    dispatch(hideDoneOrderDetails());
  }

  const selectedIngredient = useAppSelector(getIngredientDetails);

  const selectedOrder = useAppSelector(getSelectedOrder);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

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
