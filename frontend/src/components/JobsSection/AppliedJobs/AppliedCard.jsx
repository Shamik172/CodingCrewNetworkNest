import React, { useState, useEffect } from "react";
import { MdBookmark } from "react-icons/md";
import AOS from 'aos'; // Import AOS for initialization
import 'aos/dist/aos.css'; // Import the AOS CSS for animations
import { Link } from "react-router-dom";
import axios from "axios";
import AppliedJobDetails from "./AppliedJobDetails";


const AplliedCard = ({ job, postedBy , username}) => {
    job={companyName:'MicroSoft',role:'mern Stack',salary:6898,city:'adfa',deadline:'12-10-2000', 
        location:'adfasd'}
  const {
    companyName,
    companyLogo,
    role,
    salary,
    location,
    city,
    jobType,
    skillsRequired,
    experience,
    qualification,
    createdBy,
    deadline,
    description,

  } = job;
  postedBy="Sumanta";

 
  const [isModalOpen,setIsModalOpen]=useState(false);

  
  const hadlerModal = (set)=>{
    setIsModalOpen(set)
  }



  return (
    <>
      <div 
        className="relative max-w-sm  bg-white dark:bg-slate-800 dark:text-orange-600 rounded-lg p-4 shadow-md shadow-black dark:shadow-md dark:shadow-white md:w-full w-2/3 "
       
      >
        <div className="absolute top-2 right-2">
          <button 
              onClick={()=>hadlerModal(true)}
            className="dark:bg-green-800 text-white px-3 py-1 rounded-md hover:bg-green-700 bg-green-600"
          >
           Details
          </button>
        </div>
        {isModalOpen && <AppliedJobDetails hadlerModal={hadlerModal}/>}
        <div className="flex items-center mb-2">
       
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-blue-900 dark:text-purple-600">{companyName}</h3>
            <p className="text-sm text-gray-500 dark:text-orange-400">Posted by: {postedBy}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-800 dark:text-white font-medium">{role}</p>
          <p className="text-gray-500 dark:text-white">{location}, {city}</p>
        </div>

        <div>
            <p className="dark:text-white text-black ">Status:</p>
            
        </div>

        
      </div>

    </>
  );
};

export default AplliedCard;
