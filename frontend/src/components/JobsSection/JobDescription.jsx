import React, { useState } from "react";
import { MdBookmark } from "react-icons/md"; // Import the bookmark icon

const JobDescription = ({ job }) => {
  const {
    jobName,
    companyName,
    companyDescription,
    jobDescription,
    qualifications,
    location,
    salary,
    role,
    idealCandidate,
  } = job;

  const [saved, setSaved] = useState(false);

  const handleApply = () => {
    alert(`Applied for ${jobName} at ${companyName}`);
  };

  const handleSaveForLater = () => {
    setSaved(!saved);
    alert(`Job ${saved ? "removed from" : "saved to"} saved jobs.`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{jobName}</h2>
        <p className="text-gray-600 font-semibold mb-1">{companyName}</p>
        <p className="text-gray-500 mb-4">{companyDescription}</p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
        <p className="text-gray-700 mb-4">{jobDescription}</p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Qualifications</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {qualifications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-between text-gray-700 mb-4">
          <span className="block mb-2">
            <strong>Location:</strong> {location}
          </span>
          <span className="block mb-2">
            <strong>Salary:</strong> {salary}
          </span>
          <span className="block mb-2">
            <strong>Role:</strong> {role}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ideal Candidate</h3>
        <p className="text-gray-700 mb-6">{idealCandidate}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleApply}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Apply
          </button>
          <button
            onClick={handleSaveForLater}
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <MdBookmark className={`mr-2 ${saved ? "text-blue-500" : ""}`} />
            {saved ? "Saved" : "Save for Later"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
