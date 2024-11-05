import React from 'react';
import Navbar from './Heading/Heading';
import CompactJobPostCard from './JobsSection/CompactJobPostCard ';
import SearchDropDown from './JobsSection/SearchDropDown';


const Jobs = () => {
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
      <Navbar isLogin={true} />
      <div className="flex  relative top-20 justify-center">
         <div className='flex flex-col items-center space-y-4 p-4 w-2/3 max-w-3xl'>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         <CompactJobPostCard job={jobData}/>
         </div>
        
        {/* You can add more CompactJobPostCard components here */}


         <div className='relative   w-1/5 mx-4 lg:left-[6%] md:left-[4%] hidden md:flex top-5'>
          <SearchDropDown/>
         </div>
      </div>
      <div className='relative -top-20 h-32'></div>
    </>
  );
};

export default Jobs;
