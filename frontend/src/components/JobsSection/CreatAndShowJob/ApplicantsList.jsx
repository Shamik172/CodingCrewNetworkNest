import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ApplicantsList = ({ data, setShow ,Completed, SelectedStudent}) => {
  const [applicantStatus, setApplicantStatus] = useState({});

  const handleSelect = (index) => {
    setApplicantStatus((prevStatus) => ({
      ...prevStatus,
      [index]: 'selected',
    }));
  };

  const handleReject = (index) => {
    setApplicantStatus((prevStatus) => ({
      ...prevStatus,
      [index]: 'rejected',
    }));
  };
  


  return (
    <div className="flex justify-center  w-full h-screen">
      <div className="relative w-full max-w-4xl">
        <button 
          onClick={() => setShow(false)} 
          className="relative left-2 text-blue-500"
        >
          back
        </button>
        {SelectedStudent === false ?<div className="overflow-x-auto bg-white dark:bg-slate-950 shadow-md rounded">
          <table className="min-w-full">
            <thead>
              <tr className=" border-b bg-gray-200 dark:bg-gray-100 text-center divide-x-2 ">
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Resume</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody >
              {data.map((item, index) => (
                <tr key={index} className="border-b dark:border-gray-600 text-center text-black dark:text-white">
                  <td className="p-4">{item.username}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">
                    <a
                      href={item.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="p-4 flex gap-4 items-center justify-center">
                    {applicantStatus[index] === 'selected' ? (
                      <FaCheck className="text-green-500" />
                    ) : applicantStatus[index] === 'rejected' ? (
                      <FaTimes className="text-red-500" />
                    ) : (
                      <>
                        <button
                          onClick={() => handleSelect(index)}
                          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleReject(index)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot >
              
            </tfoot>
          </table>
          <div  className='text-white  relative h-16 flex justify-center items-center'>
              <span className=' bg-sky-500 px-5 py-2 rounded-md' onClick={Completed}>Completed</span>
          </div>
        </div> :  (
               <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded">
               <table className="min-w-full">
                 <thead>
                   <tr className="text-left border-b bg-gray-200 dark:bg-gray-700">
                     <th className="p-4">Username</th>
                     <th className="p-4">Email</th>
                     <th className="p-4">Resume</th>
                   </tr>
                 </thead>
                 <tbody>
                   {data.length > 0 ? (
                     data.map((item, index) => (
                       <tr key={index} className="border-b dark:border-gray-600 dark:text-white">
                         <td className="p-4">{item.username}</td>
                         <td className="p-4">{item.email}</td>
                         <td className="p-4">
                           <a
                             href={item.resumeLink}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-blue-500 underline"
                           >
                             View Resume
                           </a>
                         </td>
                       </tr>
                     ))
                   ) : (
                     <tr>
                       <td colSpan="3" className="p-4 text-center">No selected applicants</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>

        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
