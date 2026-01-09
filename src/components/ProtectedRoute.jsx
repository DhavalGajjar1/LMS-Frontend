import {Navigate,Outlet} from "react-router-dom"
import useAuth from '../hooks/useAuth'
import Loader from './Loader';

const ProtectedRoute=({allowedRoutes})=>{
    const{user,token,loading}=useAuth();

    if(loading) return <Loader/>
    if(!token) return <Navigate to="/login" replace></Navigate>
    if(allowedRoutes && !allowedRoutes.include(user?.role)){
        return <Navigate to="/dashboard" replace></Navigate>
    }

    return<Outlet></Outlet>

}

export default ProtectedRoute;