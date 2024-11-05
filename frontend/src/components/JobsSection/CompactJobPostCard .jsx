import React, { useState, useEffect } from "react";
import { MdBookmark } from "react-icons/md";

const CompactJobPostCard = ({ job }) => {
  const {
    companyName,
    companyLogo,
    role,
    salary,
    location,
    city,
    jobType,
    requiredSkills,
    experience,
    qualification,
    createdBy,
    applicationDeadline,
    jobDescription,
  } = job;

  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveForLater = (e) => {
    e.stopPropagation();
    setSaved(!saved);
    alert(`Job ${saved ? "removed from" : "saved to"} your saved jobs.`);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    alert(`Applied for the position: ${role} at ${companyName}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    <>
      <div
        className="relative w-full bg-white dark:bg-black dark:text-orange-600 rounded-lg p-4 cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white  "
       
      >
        <div className="absolute top-2 right-2">
          <button
            onClick={handleViewDetails}
            className="dark:bg-green-800 text-white px-3 py-1 rounded-md hover:bg-green-700 bg-green-600"
          >
            View Details
          </button>
        </div>

        <div className="flex items-center mb-2">
          <img
            src={companyLogo}
            alt={`${companyName} logo`}
            className="h-12 w-12 rounded-full bg-gray-400 mr-2"
          />
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-blue-900 dark:text-orange-600">{companyName}</h3>
            <p className="text-sm text-gray-500 dark:text-orange-400">Posted by: {createdBy}</p>
          </div>
        </div>

        <div className="overflow-y-auto max-h-32">
          <p className="text-lg text-gray-800 dark:text-purple-600 font-medium">{role}</p>
          <p className="text-sm text-gray-500 dark:text-white">{salary}</p>
          <p className="text-sm text-gray-500 dark:text-white">{location}, {city}</p>
          <p className="text-xs text-gray-500 dark:text-white">Deadline: {applicationDeadline}</p>
        </div>

        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            onClick={handleSaveForLater}
            className={`flex items-center ${saved ? "text-blue-500" : "text-black dark:text-white"} `}
          >
            <MdBookmark className={`mr-1`} />
            {saved ? "Saved" : "Save"}
          </button>

          <button
            onClick={handleApply}
            className="dark:bg-blue-800 text-white px-4 py-1 rounded-md hover:bg-blue-700 bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-slate-800 dark:text-white rounded-lg p-6 w-11/12 max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2">{role}</h2>
            <p className="text-lg text-gray-800 dark:text-gray-300 font-medium">{companyName}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">{location}, {city}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">{jobType}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">Salary: {salary}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">Experience: {experience}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">Qualification: {qualification}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">Skills Required: {requiredSkills.join(", ")}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Deadline: {applicationDeadline}</p>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">Job Description: {jobDescription}</p>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleSaveForLater}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500"
              >
                <MdBookmark className={`mr-1 ${saved ? "text-blue-500" : ""} dark:text-white`} />
                {saved ? "Saved" : "Save"}
              </button>

              <button
                onClick={handleApply}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompactJobPostCard;
