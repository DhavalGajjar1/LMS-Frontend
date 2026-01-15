import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                // Using the specific endpoint for instructor's courses
                const { data } = await axios.get('http://localhost:5001/api/courses/my-courses');
                setMyCourses(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchMyCourses();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <h1>Instructor Dashboard</h1>
            <div className="actions">
                <Link to="/instructor/create-course" className="btn-primary">Create New Course</Link>
            </div>

            <div className="my-courses-section">
                <h2>My Courses</h2>
                {myCourses.length === 0 ? (
                    <p>You haven't created any courses yet.</p>
                ) : (
                    <table className="courses-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCourses.map(course => (
                                <tr key={course._id}>
                                    <td>{course.title}</td>
                                    <td>
                                        <Link to={`/instructor/edit-course/${course._id}`} className="btn-secondary">Edit / Add Video</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <style>{`
                .dashboard { padding: 20px; }
                .actions { margin-bottom: 20px; }
                .btn-primary { padding: 10px 20px; background: #4a90e2; color: white; border-radius: 4px; display: inline-block; text-decoration: none; }
                .btn-secondary { padding: 5px 10px; background: #6c757d; color: white; border-radius: 4px; display: inline-block; text-decoration: none; font-size: 0.9em; }
                .courses-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .courses-table th, .courses-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                .courses-table th { background-color: #f2f2f2; }
            `}</style>
        </div>
    );
};

export default InstructorDashboard;
