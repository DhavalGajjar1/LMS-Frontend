import { createContext,useState } from "react";
import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL;

const CourseContext=createContext();

export const CourseProvider=({children})=>{
    const [courses,setCourses]=useState([]);
    const[currentCourse,setCurrentCourse]=useState(null);
    const [loading,setLoading]=useState(false);



const getCourses=async()=>{
    setLoading(true);
    try{
        const{data} =await axios.get(`${API_URL}/courses`);
        setCourses(data);
    }
    catch(error){
        console.error(error);
    }
    setLoading(false);
}


const getCourse=async(id)=>{
    setLoading(true);
    try{
        const {data}= await axios.get(`${API_URL}/courses/${id}`);
        setCurrentCourse(data);
    }
    catch(error){
        console.error(error);
    }
    setLoading(false);
};

return(
    <CourseContext.Provider value={{courses,currentCourse,getCourses,getCourse,loading}} >
            {children}

    </CourseContext.Provider>
)


}

export default CourseContext;