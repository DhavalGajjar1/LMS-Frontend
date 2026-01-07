import React from 'react';
 
import { Routes,Route, Navigate } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Home from '../Home.jsx'


const DashboardDispatcher=()=>{
    const{user}=useAuth();
    if(!user)return <Navigate to='/login'></Navigate>
}
const AppRoutes=()=>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </>
    )
}

export default AppRoutes;
