import axios from "axios";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    if(!token) {
        navigate("/login");
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //show child elements
    return <Outlet />

}

export default ProtectedRoutes;