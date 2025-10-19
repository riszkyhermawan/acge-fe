import {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { login as APIlogin, getMe, register as APIRegister } from '../service/api';


const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const tokenData = localStorage.getItem("auth_token");
            if (tokenData) {
                try {
                    const userData = await getMe(tokenData);
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setUser(null);
                    localStorage.removeItem("auth_token");
                    throw error;
                }
            }
            setLoading(false);
        }
        fetchUser();
    }, []);


    const login = async (username, password) => {
        try {
            const tokenData = await APIlogin(username, password);
            localStorage.setItem("auth_token", tokenData.access_token);

            const userData = await getMe(tokenData.access_token);
            setUser(userData);
            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };


    const register = async (username, full_name, password) => {
        try {
            const userData = await APIRegister(username, full_name, password);
            return { userData, message: "Registration successful" };
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

   
    const logout = () => {
      setUser(null);
      localStorage.removeItem("auth_token");

    };

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        logout,
        login,
        register,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}





export function useAuth() {
    return useContext(AuthContext);
}