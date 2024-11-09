
// it is jobDetailsFrom to click the job deatils then show 

import React from 'react';
import { useLocation } from 'react-router-dom';

const JobDetailPage = () => {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return <div>Job details not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-2">{job.role}</h2>
      <p className="text-xl font-semibold">{job.companyName}</p>
      <p>{job.location}, {job.city}</p>
      <p>Job Type: {job.jobType}</p>
      <p>Salary: {job.salary}</p>
      <p>Experience: {job.experience}</p>
      <p>Qualification: {job.qualification}</p>
      <p>Skills Required: {job.requiredSkills.join(", ")}</p>
      <p>Application Deadline: {job.applicationDeadline}</p>
      <p className="mt-4 font-medium">Job Description:</p>
      <p>{job.jobDescription}</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailPage;
