import React, { useState } from 'react';
import AplliedCard from './AppliedCard';
import { FcSearch } from "react-icons/fc";
const AppliedJobs = ({ ToggleShowJobs }) => {
 

  return (
    <div className="flex  w-full flex-col max-h-screen bg-white dark:bg-gray-800 shadow-lg max-w-3xl">
      {/* Header with navigation buttons */}
      <div className="flex justify-between items-center p-2 border-b dark:border-gray-700">
        <button
          className="text-black dark:text-white"
          onClick={() => ( ToggleShowJobs(false) )}
        >
         Back
       </button>
        
       <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-500">
        <FcSearch className="text-gray-500 mr-2" />
        <input 
            type="search" 
            placeholder="Search...." 
            className="w-full pr-10 py-2 focus:outline-none dark:focus:bg-gray-800 dark:bg-gray-800 text-sm dark:text-white"
        />
        </div>

        <button
          className="text-black dark:text-white"
          onClick={()=>(ToggleShowJobs(false))}
         
        >
          Next
        </button>
      </div>
      <div className='flex justify-evenly '>
        <button className='sm:px-2.5 px-1.5 bg-green-500 rounded-md py-1 mt-1'>Accepted</button>
        <button className='sm:px-2.5 px-1.5 bg-yellow-500 rounded-md py-1 mt-1'>Pending</button>
        <button className='sm:px-2.5 px-1.5 bg-red-500 rounded-md py-1 mt-1'>Rejected</button>
     
      </div>

      {/* Content area */}
      
      <div className="overflow-y-auto p-4 md:grid  gap-10 text-black dark:text-white h-full md:grid-cols-2 flex flex-col items-center">
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
        <AplliedCard />
      </div>

    </div>
  );
};

export default AppliedJobs;
