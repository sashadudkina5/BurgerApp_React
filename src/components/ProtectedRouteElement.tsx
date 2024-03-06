import { Navigate, useLocation } from "react-router";
import { getLoggedInStatus, getLoggingInLoading } from "../redux_services/selectors";
import { useAppSelector } from "../hooks/dispatch-selectos"

interface IProtectedRouteElementProps {
  children: React.ReactNode;
}

/**
 * Protects routes that require authentication. 
 * Checks if the user is logged in and redirects the user to the login page if they are not authenticated.
 * Authentication checking is done both in the `App.tsx` component with `getUserInfoThunk` dispatch, and in this component.
 * 
 * @component
 * 
 * @param {React.ReactNode} children - The child components to be rendered if the user is authenticated.
 * 
 * - If the authentication status is loading (`isLoading`), it renders a loading indicator.
 * - If the user is not logged in (`!isLoggedIn`), it redirects the user to the login page.
 * - If the user is logged in, it renders the child components passed to it.
 * 
 * @example
 * <ProtectedRouteElement>
 *   <YourProtectedComponent />
 * </ProtectedRouteElement>
 */
const ProtectedRouteElement: React.FC<IProtectedRouteElementProps> = ({
  children
}) => {
  const location = useLocation();

  /**
   * Checks if the user is logged in. Status stored in redux
   */
  const isLoggedIn = useAppSelector(getLoggedInStatus);

  /**
   * Checks if the user log status is loading
   */
  const isLoading = useAppSelector(getLoggingInLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  else if (!isLoggedIn) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
