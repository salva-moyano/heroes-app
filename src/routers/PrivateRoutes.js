import {AuthContext} from "../auth/authContext";
import { useContext } from "react";
import {Navigate, useLocation} from "react-router-dom";

export const PrivateRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);

    const {pathname, search} = useLocation();

    localStorage.setItem('lastPath', `${pathname}${search}`);

    return user.logged ? children : <Navigate to="/login"/>
}