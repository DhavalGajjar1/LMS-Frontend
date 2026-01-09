import React from 'react';
 
import { Routes,Route, Navigate } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Home from '../Home.jsx'
import Navbar from '../../components/Navbar.jsx';
import InstructorDashboard from '../Instructor/Dashboard.jsx';
import CreateCourse from '../Instructor/CreateCourse.jsx';
import ProtectedRoute from '../../components/ProtectedRoute.jsx';
import useAuth from '../../hooks/useAuth.js';


const DashboardDispatcher=()=>{
    const{user}=useAuth();
    if(!user)return <Navigate to='/login'></Navigate>

    if(user.role==='instructor') return <InstructorDashboard/>
    return 
}
const AppRoutes=()=>{
    return(
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>


                <Route element={<ProtectedRoute></ProtectedRoute>}>
                    <Route path='/dashboard' element={<DashboardDispatcher/>}/>
                    <Route path="/instructor/create-course" element={<CreateCourse/>}/>
                </Route>

            </Routes>
        </>
    )
}

export default AppRoutes;
