import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import {getLoggedInStatus} from "../redux_services/selectors";


export function ProtectedRouteElement({ children }) {

    const location = useLocation();
    const isLoggedIn = useSelector(getLoggedInStatus);


    if (!isLoggedIn) {
        return <Navigate to={'/login'} state={{from: location}}/>
    }

    return children;
}