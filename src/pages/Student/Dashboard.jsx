import { useEffect,useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL
const StudentDashboard = ()=>{
    const[myEnrollments,setMyEnrollments] = useState([]);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        const fetchEnrollments = async()=>{
            try{
                const {data} = await axios.get(`${API_URL}/enrollments/my-courses`)
                setMyEnrollments(data);
            }catch (error){
                console.error(error);
            }
            setLoading(false)
        }
        fetchEnrollments();
    },[])

    if(loading) return <div>Loading...</div>

    return(
        <div className="dashboard">
            {myEnrollments.length===0?(
                <p>You are not enrolled in any courses.<Link to="/">Browse Courses</Link></p>
            ):(
                <div className="course-grid">
                    {myEnrollments.map((item)=>(
                        <div key={item.id} className="course-card">
                            <div className="card-body">
                                <h3>{item.course.title}</h3>
                                <p>{item.course.description.substring(0,100)}...</p>
                                <Link to={`/learn/${item.course._id}`} className="btn-secondary">Continue Learning</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

  <style>{`
                .dashboard { padding: 20px; }
                .course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 20px; }
                .course-card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: white; }
                .card-body { padding: 15px; }
                .btn-secondary { display: inline-block; padding: 8px 12px; background: #6c757d; color: white; border-radius: 4px; margin-top: 10px; }
            `}</style>

        </div>
    )



}
export default StudentDashboard;