import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import useAuth from "../hooks/useAuth"

const API_URL = import.meta.env.VITE_BACKEND_URL

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState(null)
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddLesson, setShowAddLesson] = useState(false);
    const [lessonData, setLessonData] = useState({ title: '', videoUrl: '', duration: 0, content: '' });

    useEffect(() => {
        fetchCourse();
    }, [id, user]);

    const fetchCourse = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/courses/${id}`);
            setCourse(data);

            if (user) {
                const checkRes = await axios.get(`${API_URL}/enrollments/check/${id}`);
                setIsEnrolled(checkRes.data.isEnrolled)

            }
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    }


    const handleEnroll = async () => {
        if (!user) {
            navigate('/login')
            return;
        }
        try {
            await axios.post(`${API_URL}/enrollments/${id}`)
            setIsEnrolled(true)
            alert('Enrolled Successfully')
        }
        catch (error) {
            console.error(error)
            alert(error.response?.data?.message || 'Enrolled failed')
        }
    }

    const handleAddLesson = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/courses/${id}/lessons`, lessonData)
            alert('Lesson added')
            setShowAddLesson(false);
            setLessonData({ title: '', videoUrl: '', duration: 0, content: '' })
            fetchCourse();
        } catch (error) {
            console.error(error);
            alert("Failed to add lesson")
        }
    };



    if (loading) return <div>Loading</div>
    if (!course) return <div>Course not found</div>

    const isInstructor = user && (user._id === course.instructor?._id || user.role === "admin")

    return (
        <div className="course-details">
            <div className="header">
                <h1>{course.title}</h1>
                <p>{course.description}</p>
                <div className="meta">
                    <span>Instructor : {course.instructor?.name}</span>
                    <span>Lessons:{course.lessons.length}</span>
                </div>
                {isInstructor ? (
                    <button className="btn-primary" onClick={() => setShowAddLesson(!showAddLesson)}>
                        {showAddLesson ? 'Cancel Add Lesson' : 'Add Lesson'}
                    </button>
                ) : isEnrolled ? (
                    <button className="bten-secondary" onClick={() => navigate(`/learn/${id}`)}>Go to Lessons</button>
                ) : (
                    <button className="btn-primary" onClick={handleEnroll}>Enroll Now</button>
                )}
            </div>

            {showAddLesson && (
                <div className="add-lesson-form">
                    <h3>Add New Lesson</h3>
                    <form onSubmit={handleAddLesson}>
                        <input type="text" placeholder="Lesson Title" value={lessonData.title} onChange={e => setLessonData({ ...lessonData, title: e.target.value })} required></input>
                        <input type="text" placeholder="Video URL" value={lessonData.videoUrl} onChange={e => setLessonData({ ...lessonData, videoUrl: e.target.value })} required ></input>
                        <input type="number" placeholder="Duration (mins)" value={lessonData.duration} onChange={e => setLessonData({ ...lessonData, duration: e.target.value })}></input>
                        <button type="submit">Save Lesson </button>
                    </form>
                </div>
            )}
            <div className="curriculam">
                <h2>Curriculam</h2>
                <ul>
                    {course.lessons.map((lesson, index) => (
                        <li key={index} className="lesson-item">
                            <span>{index + 1}. {lesson.title}</span>
                            <span>{lesson.duration} mins</span>
                        </li>
                    ))}
                </ul>
            </div>
            <style>
                {`
                      .course-details { max-width: 800px; margin: 40px auto; padding: 20px; }
                .header { margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
                .meta { display: flex; gap: 20px; color: #666; margin: 15px 0; }
                .curriculum { background: #f9f9f9; padding: 20px; border-radius: 8px; }
                .lesson-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ddd; }
                .lesson-item:last-child { border-bottom: none; }
                .btn-primary { padding: 12px 24px; background: #4a90e2; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; }
                .btn-secondary { padding: 12px 24px; background: #2ecc71; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; }
                .add-lesson-form { background: #f0f0f0; padding: 15px; margin-bottom: 20px; border-radius: 8px; }
                .add-lesson-form input { display: block; width: 100%; padding: 8px; margin-bottom: 10px; }
                .add-lesson-form button { padding: 8px 16px; background: #333; color: white; border: none; cursor: pointer; }   
                    
                    `}
            </style>




        </div>
    )

};

export default CourseDetails;












