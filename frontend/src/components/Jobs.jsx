import React, { useState, useEffect } from 'react';
import Navbar from './Heading/Heading';

import CompactJobPostCard from './JobsSection/CompactJobPostCard';
import SearchDropDown from './JobsSection/SearchDropDown';
import { IoReturnUpBackOutline } from "react-icons/io5"
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import CustomerData from '../Store/CustomerDataProvider';


const Jobs = () => {


  const {userData,isLogin} = useContext(CustomerData);



  console.log("jobs",userData);
  console.log("my login",isLogin)
  
  const jobData = {
    companyName: "Tech Innovators Inc.",
    companyLogo: "https://example.com/logo.png",
    role: "Frontend Developer",
    salary: "$70,000 - $90,000 per year",
    location: "Remote",
    city: "San Francisco",
    jobType: "Full-Time",
    requiredSkills: ["JavaScript", "React", "CSS", "HTML", "TypeScript"],
    experience: "3+ years of experience in frontend development",
    qualification: "Bachelor's degree in Computer Science or related field",
    createdBy: "John Doe",
    applicationDeadline: "2024-12-31",
    jobDescription: "We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate "
  };
  

  const handleJobClick = () => {
    alert("Opening detailed job view...");
    // Logic to display JobCard can be added here
  };



  return (
    <>

      {/* <div className='dark:text-white text-center relative top-6 bg-slate-100 dark:bg-slate-600 md:w-1/3 sm:w-1/2 w-4/5  m-auto rounded-full py-1 text-3xl'>
      <Link to={'/'} className=' absolute bg-purple-300 dark:bg-purple-500 text-black dark:text-white text-sm md:text-base right-3/4 px-2 rounded-full py-1 md:top-1.5 top-2'>go Home</Link>Job Post</div> */}

      <div className='relative  mx-5  md:hidden  top-20 space-y-2'>
          <div className="space-y-3 sm:w-2/3 m-auto">
              <button className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700">
                  Create Job+
              </button>
              <button className="block w-full px-4 py-2 bg-gray-200 dark:bg-sky-950 text-center rounded-lg hover:bg-gray-300 dark:hover:bg-sky-800 text-gray-800 dark:text-white">
                  Past  Job
              </button>
          </div>
          <SearchDropDown/>
      </div>
      <div className="flex  relative top-20 justify-center">
         <div className='flex flex-col items-center space-y-10 p-4 sm:w-2/3 w-full max-w-3xl'>
         <CompactJobPostCard job={jobData} />
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         </div>
        
        {/* You can add more CompactJobPostCard components here */}


         <div className='relative  md:w-1/5 md:mx-4 lg:left-[6%] md:left-[4%] hidden  md:flex top-5'>
          <SearchDropDown/>
         </div>
        
      </div>
      <div className='relative -top-20 h-32 -z-50'></div>
    </>
  );
};

export default Jobs;
