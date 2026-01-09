import { useEffect,useState } from "react";
import {useParams,useNavigate} from "react-router-dom"
import axios from "axios";
import useAuth from "../hooks/useAuth"

const API_URL = import.meta.env.VITE_BACKEND_URL

const CourseDetails = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useAuth();
    const [course,setCourse] = useState(null)
    const [isEnrolled , setIsEnrolled] = useState(false);
    const [loading,setLoading] = useState(true);
    const[showAddLesson,setShowAddLesson]=useState(false);
    const[lessonData,setLessonData]=useState({title:'',videoUrl:'',duration:0,content:''});

    useEffect(()=>{
        fetchCourse();
    },[id,user]);

    const fetchCourse = async () => {
        try{
            const {data} = await axios.get(`${API_URL}/courses/${id}`);
            setCourse(data);

            // if(user){
            //     const checkRes = await axios.get(`${API_URL}/`)
            }catch(error){
                console.error(error);
            }
            setLoading(false);
        }


        if(loading) return <div>Loading</div>
        if(!course) return <div>Course not found</div>

        const isInstructor = user && (user._id === course.instructor?._id || user.role === "admin" ) 

        return(
            <div className="course-details">
                <div className="header">
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                    <div className="meta">
                        <span>Instructor : {course.instructor?.name}</span>
                        <span>Lessons:{course.lessons.length}</span>
                    </div>
                    {/* {isInstructor ?(
                        <button className="btn-primary" onClick={}></button>
                    )} */}
                </div>
            </div>
        )

    }












