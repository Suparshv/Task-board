import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('task_user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = (email, password, remember) => {
        if (email === 'intern@demo.com' && password === 'intern123') {
            const userData = { email, name: 'Intern User' };
            setUser(userData);
            if (remember) localStorage.setItem('task_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('task_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};