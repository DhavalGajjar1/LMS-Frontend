import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL

const LessonPlayer = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseRes = await axios.get(`${API_URL}/courses/${courseId}`);
                setCourse(courseRes.data)

                const progressRes = await axios.get(`${API_URL}/progress/${courseId}`);
                setProgress(progressRes.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false)
        };
        fetchData();
    }, [courseId]);

    const handleMarkComplete = async (lessonId) => {
        try {
            const { data } = await axios.put(`${API_URL}/progress/${courseId}/lesson/${lessonId}`);
            setProgress(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading Player...</div>
    if (!course) return <div>Course not found</div>;

    const currentLesson = course.lessons[currentLessonIndex];
    if (!currentLesson) return <div>No lessons availble</div>;

    const isCompleted = progress?.completedLessons.includes(currentLesson._id);

    return (
        <div className="player-container">
            <div className="video-section">
                <h2>{currentLesson.title}</h2>
                <div className="video-placeholder">
                    <p>Playing:{currentLesson.videoUrl}</p>
                </div>
                <div className="control">
                    {!isCompleted && (
                        <button className="btn-complete" onClick={() => handleMarkComplete(currentLesson._id)}>
                            Mark as Complete
                        </button>
                    )}
                    {isCompleted && <span className="completed-badges">Completed</span>}
                </div>
            </div>
            <div className="playlist">
                <h3>Course Content</h3>
                <ul>
                    {course.lessons.map((lesson, index) => (
                        <li
                            key={lessond._id}
                            className={index === currentLesson ? "active" : ''}
                            onClick={() => setCurrentLessonIndex(index)}
                        >
                            <span>{index + 1}. {lesson.title}</span>
                            {progress?.completedLessons.includes(lesson._id) && <span>✓</span>}

                        </li>
                    ))}
                </ul>
                <div className="progress-overall">
                    <p>Progress: {Math.round(progress?.completionPercentage || 0)}%</p>
                </div>
            </div>
            <style>{`
                .player-container { display: flex; height: calc(100vh - 64px); }
                .video-section { flex: 3; padding: 20px; background: #000; color: white; display: flex; flex-direction: column; }
                .video-placeholder { flex: 1; background: #333; display: flex; align-items: center; justify-content: center; margin: 20px 0; }
                .playlist { flex: 1; background: #f5f5f5; padding: 20px; overflow-y: auto; border-left: 1px solid #ddd; }
                .playlist li { padding: 10px; cursor: pointer; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; }
                .playlist li:hover { background: #eee; }
                .playlist li.active { background: #e6f7ff; font-weight: bold; }
                .btn-complete { padding: 10px 20px; background: #27ae60; color: white; border: none; cursor: pointer; border-radius: 4px; }
                .completed-badge { color: #27ae60; font-weight: bold; }
            `}</style>

        </div>
    )


}

export default LessonPlayer;