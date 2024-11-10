import React, { useState } from 'react';
import AplliedCard from './AppliedCard';
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
        
        <div>
        <input 
            type="search" 
            placeholder="Searching..."
            className="border-b-2 border-gray-300 px-4 focus:outline-none focus:border-blue-500 dark:focus:bg-gray-800 dark:bg-gray-800"
         />search
        </div>

        <button
          className="text-black dark:text-white"
          onClick={()=>(ToggleShowJobs(false))}
         
        >
          Next
        </button>
      </div>
      <div className='flex justify-evenly'>
        <button>Accepted</button>
        <button>Pending</button>
        <button>Rejected</button>
     
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
