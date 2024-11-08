import React, {useState} from 'react'
import Navbar from './Heading/Heading'
import ProfileSection from './Profile/Profile'
import Skills from './Profile/Skills/Skills'
import Project from './Profile/Project/Project'
import Experience from './Profile/Experience/Experience'
import Education from './Profile/Education/Education'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const YourProfile = () => {
    const location = useLocation();
    // console.log(location)
  
  

  const profileData = location.state?.profileData;
  // console.log(profileData);

  const isLogin = location.state?.isLogins;

//   console.log("Profile Data:", profileData);

//   console.log("Is Logged In:", isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        
      if (typeof profileData === "undefined"  || !profileData) {
        navigate('/');
        return; // Redirect to Home if userData is not available
      }
    }, [profileData, navigate]);
    //  console.log(profileData);

  return (
   <>
      <div className='flex md:justify-center md:space-x-10 justify-center'>
                <Navbar isLogin={isLogin} userData={profileData} />
            <div className='relative top-20 h-96 w-60   hidden md:flex flex-col rounded-lg p-5  bg-white dark:bg-black text-black dark:text-white'>
                 <div className='text-xl font-semibold border-b-2 dark:border-blue-950 pb-2'>Connection:
                     <span className=' ml-2 font-light relative top-0.5'>3<sup>+</sup></span>
                 </div>
                 <div className='space-y-2'>
                    
                    <div>Sumanta</div>
                 </div>
                
            </div>
            <div>
               
                <ProfileSection userId = {profileData._id}/>
                <Skills userId = {profileData._id}/>
                <Project userId = {profileData._id}/>
                <Experience userId = {profileData._id}/>
                <Education userId = {profileData._id}/>
            </div>
        
      </div>
      <div className='relative -top-20 h-20 -z-10'></div>
      
   </>
  )
}

export default YourProfile