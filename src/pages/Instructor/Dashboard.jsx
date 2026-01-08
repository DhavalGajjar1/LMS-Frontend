import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
    // Ideally we should have an endpoint to get ONLY courses created by me
    // For now reusing getCourses and filtering or creating a new endpoint in backend if strictly needed
    // But since course controller has no "get my created courses", I will use public get courses and filter by myself on frontend
    // WAIT, for security/performance, better to add backend endpoint.
    // However, I am in frontend phase. I will assume I can just fetch all for now or I will update backend later.
    // Re-reading controller: getCourses is public and returns ALL courses.
    // I should create 'getMyCourses' for instructor.
    // For MVP, I'll filter on client side or simply show "Create Course" for now.

    return (
        <div className="dashboard">
            <h1>Instructor Dashboard</h1>
            <div className="actions">
                <Link to="/instructor/create-course" className="btn-primary">Create New Course</Link>
            </div>

            <div className="my-courses-section">
                <h2>My Courses</h2>
                <p>Course management list will be here.</p>
                {/*  List courses created by instructor */}
            </div>

            <style>{`
                .dashboard { padding: 20px; }
                .actions { margin-bottom: 20px; }
                .btn-primary { padding: 10px 20px; background: #4a90e2; color: white; border-radius: 4px; display: inline-block; }
            `}</style>
        </div>
    );
};

export default InstructorDashboard;
