
import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../utils/apiService';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password, role) => {
        try {
            const data = await authAPI.login(email, password, role);

            localStorage.setItem('token', data.token);

            // Construct user object based on role and response data
            // Admin login returns: { token, message }
            // User login returns: { token, message, user: { id, username, email, role } }
            // const userData = role === 'admin'
            //     ? { email, role: 'admin' }
            //     : { email, role: 'user', ...data.user };

            const userData = role === 'admin'
                ? {
                    email,
                    role: 'admin',
                    username: 'Admin'
                }
                : {
                    ...data.user,
                    role: 'user'
                };

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Login failed'
            };
        }
    };

    const signup = async (username, email, password, role) => {
        try {
            await authAPI.signup(username, email, password, role);
            return { success: true };
        } catch (error) {
            console.error("Signup error:", error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Signup failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
