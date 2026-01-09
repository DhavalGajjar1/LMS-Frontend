import {useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"

const InstructorDashboard=()=>{
    return(
        <div className='dashboard'>

            <h1>Instructor Dashboard</h1>
            <div className='action'>
                <Link to="/instructor/create-course" className='btn-primary'>Create New Course</Link>
            </div>

            <div className='my-course-section'>
                <h2>My Courses</h2>
                <p>Course management list will be here</p>
            </div>

            <style>{`
                .dashboard{padding:20px;}
                .actions{margin-bottom:20px;}
                .btn-primary{padding:10px 20px; background:#4a90e2; color:white; border-radius:4px;  display:inline-block;}
            `}</style>
        </div>
    )
}

export default InstructorDashboard;