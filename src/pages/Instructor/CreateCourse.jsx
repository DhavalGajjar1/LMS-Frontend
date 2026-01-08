import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"

const API_URL = import.meta.env.VITE_BACKEND_URL;
const CreateCourse=()=>{
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const{data}=await axios.post(`${API_URL}/courses`,{
                title,
                description
            })
            navigate(`/course/${data._id}`);
        }
        catch(error){
            console.error(error);
            alert('Failed to create course')
        }
    };

    return(
        <div className="create-course-container">
            <h1>Create new course</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Course Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                     value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                        row="5">
                       
                    </textarea>
                </div>
                <button type="submit" className="btn-primary">Create Course</button>
            </form>
              <style>{`
                .create-course-container { max-width: 600px; margin: 40px auto; padding: 20px; }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
                .form-group input, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
                .btn-primary { padding: 10px 20px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; }
            `}</style>
        </div>
    );
};

export default CreateCourse;