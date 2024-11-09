import React, { useState } from "react";
import { MdBookmark, MdShare, MdPrint } from "react-icons/md";
// { job, handlePrint, handleShare } props
const JobDescription = () => {
   const handleShare = ()=>{

   }
   const handlePrint = ()=>{

   }
  const job = {
    companyName: "Tech Innovators Inc.",
    companyLogo: "https://example.com/logo.png",
    role: "Frontend Developer",
    salary: "$70,000 - $90,000 per year",
    location: "Remote",
    city: "San Francisco",
    jobType: "Full-Time",
    requiredSkills: ["JavaScript", "React", "CSS", "HTML", "TypeScript"],
    experience: "3+ years of experience in frontend development",
    qualification: ["Bachelor's degree in Computer Science or related field"],
    createdBy: "John Doe",
    applicationDeadline: "2024-12-31",
    jobDescription: "We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate "
  };
  const {
    companyPicture,
    companyLogo,
    companyName,
    role,
    location,
    city,
    jobType,
    salary,
    experience,
    qualification,
    requiredSkills,
    applicationDeadline,
    jobDescription,
  } = job;
  
  

  const [saved, setSaved] = useState(false);

  const handleApply = () => {
    alert(`Applied for ${role} at ${companyName}`);
  };

  const handleSaveForLater = () => {
    setSaved(!saved);
    alert(`Job ${saved ? "removed from" : "saved to"} saved jobs.`);
  };

  return (
      <div className="flex justify-center ">
      {/* A4 Styled Job Detail Page */}
      <div className="bg-white dark:bg-slate-800 dark:text-white p-8 max-w-3xl w-full h-full shadow-lg rounded-lg overflow-y-auto relative flex flex-col mt-20 mx-2 mb-5">
        {/* Top Section: Company Picture and Logo */}
          <div className="flex justify-between mb-6">
            {/* Company Picture on the Top Left */}
            <div className="w-1/4">
              <img src={companyPicture} alt="Company" className="w-full h-auto rounded-lg" />
            </div>

            {/* Company Logo and Name on the Top Right */}
            <div className="w-1/2 text-right">
              <img src={companyLogo} alt="Company Logo" className="w-20 h-20 mx-auto" />
              <h2 className="text-3xl font-bold mt-2">{companyName}</h2>
            </div>
          </div>

        {/* Job Details Section */}
          <div className="text-gray-700 dark:text-gray-300">
            <h3 className="text-2xl font-semibold mb-2">{role}</h3>
            <p className="text-lg mb-1">
              {location}, {city} - <span className="capitalize">{jobType}</span>
            </p>
            <p className="text-lg mb-1">Salary: {salary}</p>
            <p className="text-lg mb-1">Experience: {experience}</p>
            <p className="text-lg mb-1">Qualification: {qualification}</p>
            <p className="text-lg mb-1">Skills Required: {requiredSkills.join(", ")}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Deadline: {applicationDeadline}</p>

            {/* Job Description */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Job Description</h4>
              <p className="text-sm leading-relaxed">{jobDescription}</p>
            </div>
          </div>

        {/* Bottom Action Toolbar */}
        {/* <div className="fixed bottom-0  bg-white max-w-3xl dark:bg-slate-800 border-t dark:border-gray-700 py-2 flex justify-around items-center text-gray-600 dark:text-gray-300"> */}
          <button
            onClick={handleSaveForLater}
            className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <MdBookmark className={saved ? "text-blue-500 dark:text-blue-400" : ""} />
            <span>{saved ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleShare ? handleShare : () => alert("Share feature not implemented")}
            className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <MdShare />
            <span>Share</span>
          </button>

          <button
            onClick={handlePrint ? handlePrint : () => alert("Print feature not implemented")}
            className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <MdPrint />
            <span>Print</span>
          </button>

          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      {/* </div> */}
    </div>
  );
};

export default JobDescription;
