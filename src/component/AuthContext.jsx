import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Provide AuthContext to children
export const AuthProvider = ({ children }) => {
	// Initialize auth state with localStorage values
	const [auth, setAuth] = useState(() => {
		const token = localStorage.getItem('authToken');
		const email = localStorage.getItem('email');
		return { token: token || null, email: email || null };
	});

	// Login function
	const login = (email, token, resfresh_token) => {
		setAuth({ token, email });
		localStorage.setItem('authToken', token);
		localStorage.setItem('resfresh_token', resfresh_token);
		localStorage.setItem('email', email);
	};

	// Logout function
	const logout = () => {
		setAuth({ token: null, email: null });
		localStorage.removeItem('authToken');
		localStorage.removeItem('email');
		localStorage.removeItem('resfresh_token');
	};

	// Check if user is authenticated
	const isAuthenticated = !!auth.token;

	return (
		<AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook for accessing AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
