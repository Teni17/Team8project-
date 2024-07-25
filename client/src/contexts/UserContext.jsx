import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [role, setRole] = useState(null); // tracking role constantly

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken?.role || 'user');
        }
    }, []);

    const setRoleAndToken = (token) => {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
        localStorage.setItem('token', token);
    };

    return (
        <UserContext.Provider value={{ role, setRoleAndToken }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
