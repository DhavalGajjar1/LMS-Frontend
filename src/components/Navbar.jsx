import {Link, Links} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = ()=>{
    const{user,logout} = useAuth();

    return(
        <nav className='navbar'>

            <ul className='nav-links'>
                {user ? (
                    <>
                        <li>
                            <span>Hello,{user.name} ({user.role})</span>
                        </li>
                        <li>
                            <Link to='/dashboard'>Dashboard</Link>
                        </li>
                        <li>
                            <button onClick={logout} className="btn-logout">Logout</button>
                        </li>
                    </>
                ):(
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </>
                )
            
            }
            </ul>
             <style>{`
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .logo a {
            font-size: 1.5rem;
            font-weight: bold;
            color: #4a90e2;
        }
        .nav-links {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .btn-logout {
            background: #ff4d4f;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        }
      `}</style>
        </nav>


    )


}

export default Navbar;