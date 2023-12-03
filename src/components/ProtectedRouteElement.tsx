import { Navigate, useLocation } from "react-router";
import { getLoggedInStatus, getLoggingInLoading } from "../redux_services/selectors";
import { useAppSelector } from "../hooks/dispatch-selectos"

interface IProtectedRouteElementProps {
  children: React.ReactNode;
}

const ProtectedRouteElement: React.FC<IProtectedRouteElementProps> = ({
  children
}) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(getLoggedInStatus);

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
