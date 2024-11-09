import './App.css';
import { Outlet } from 'react-router-dom';
import CustomerData from './Store/LoginUserDataProvider';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from './components/Heading/Heading';
import { DarkandLightTheme } from './DarkandLightTheme';

function App() {
    const { userData, userHandler, isLogin, handlerLogin } = useContext(CustomerData);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch the login status and user data from the backend
        axios.get('http://localhost:3000/auth/isLogin', { withCredentials: true })
            .then(response => {
                console.log(response);
                const { isLoggedIn, user } = response.data;
                console.log(isLoggedIn);

                handlerLogin(isLoggedIn);
                
                if (isLoggedIn) {
                    userHandler(user);
                }
                
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.log('Error checking login status:', error);
                setLoading(false); // Ensure loading is false even if there's an error
            });
    }, []);

    return (
        <>
            {loading ? ( // Show loading screen if still loading
                <div className="flex items-center justify-center min-h-screen bg-slate-300 dark:bg-slate-950">
                    <p className="text-xl text-gray-600 dark:text-gray-300">Loading...</p>
                </div>
            ) : (
                <div className="bg-slate-300 dark:bg-slate-950">
                    <DarkandLightTheme />
                    <Navbar />
                    <Outlet />
                    
                </div>
            )}
        </>
    );
}

export default App;
