import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from './Profile/Profile';
import Skills from './Profile/Skills/Skills';
import Project from './Profile/Project/Project';
import Experience from './Profile/Experience/Experience';
import Education from './Profile/Education/Education';
import CustomerData from '../Store/LoginUserDataProvider';
import axios from 'axios';

const YourProfile = () => {
    const { userData, isLogin } = useContext(CustomerData);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        console.log("isLogin status:", isLogin); // Debug check for isLogin status
        if (!isLogin) {
            setShowPopup(true);
            const timer = setTimeout(() => {
                navigate('/');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isLogin, navigate]);

    useEffect(()=>{
        axios.get(`http://localhost:3000/user/connections/${userData.username}`, {withCredentials: true})
        .then(result=>{
            // console.log(result);
            setConnections(result.data);
        })
        .catch()
    }, [])

    function capitalizeFirstLetter(str) {
        if (!str) return str; // Return an empty string or undefined if the input is falsy
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {/* Popup box for not logged-in message */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold mb-4">You are not logged in</p>
                        <p className="text-gray-600">Redirecting to home page...</p>
                    </div>
                </div>
            )}


            {/* Profile content */}
            {userData ? (
                <div className="flex md:justify-center md:space-x-10 justify-center">
                    <div className="relative top-20 h-96 w-60 hidden md:flex flex-col rounded-lg p-5 bg-white dark:bg-black text-black dark:text-white">
                        <div className="text-xl font-semibold border-b-2 dark:border-blue-950 pb-2">
                            Connections:
                            <span className="ml-2 font-light relative top-0.5">
                                {connections.length > 0 ? `${connections.length}`: ''}
                            </span>
                        </div>
                        <div 
                            className="space-y-2 overflow-y-auto"
                            style={{ maxHeight: '50vh' }}  // Set max height to half the screen height
                        >
                            {connections.length > 0 ? (
                                connections.map((connection, index) => (
                                    <div key={index}>{capitalizeFirstLetter(connection.name)}</div>
                                ))
                            ) : (
                                <div>No connections available</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <ProfileSection userId={userData._id} />
                        <Skills userId={userData._id} />
                        <Project userId={userData._id} />
                        <Experience userId={userData._id} />
                        <Education userId={userData._id} />
                    </div>
                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Loading...
                </div>
            )}
        </>
    );
};


export default YourProfile;
