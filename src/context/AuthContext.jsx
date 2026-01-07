import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log("API_URL =", API_URL);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        const checkUser = async () => {
            if (token) {
                try {
                    const { data } = await axios.get(`${API_URL}/auth/me`);
                    setUser(data);

                } catch (error) {
                    console.error(error);
                    logout();
                }
            }
            setLoading(false);
        }
        checkUser();
    }, [token]);

    const login = async (email, password) => {



        const { data } = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });

        console.log("LOGIN RESPONSE:", data);

        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser({
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const register = async ({ name, email, password, role }) => {
        const { data } = await axios.post(`${API_URL}/auth/register`, {
            name,
            email,
            password,
            role,
        });
        localStorage.setItem('token', data.token);
        setToken(data.token)
        setUser(data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;
