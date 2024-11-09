import React from 'react';

const JobCard = ({ role, salary, location, city, jobType, applicationDeadline }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-black max-w-5xl  w-full ">
      <h2 className="text-2xl font-semibold mb-2 text-blue-600">{role}</h2>
      <p className="text-lg font-medium text-gray-300">Salary: {salary || 'Not specified'}</p>
      <p className="text-gray-200">Location: {location || 'Remote'}</p>
      <p className="text-gray-200">City: {city}</p>
      <p className="text-gray-200">Job Type: {jobType}</p>
      <p className="text-red-500 mt-2">Application Deadline: {applicationDeadline || 'Open until filled'}</p>
    </div>
  );
};

export default JobCard;
