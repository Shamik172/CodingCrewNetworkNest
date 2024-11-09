import React, { useState } from 'react'
import CreatAndShowjob from '../JobsSection/CreatAndShowJob/CreatAndShowjob'
import JobDescription from '../JobsSection/JobDescription'





const Test = () => {


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
      qualification: ["Bachelor's degree in Computer Science or related field"],
      createdBy: "John Doe",
      applicationDeadline: "2024-12-31",
      jobDescription: "We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate Frontend Developer to join our team. You will be responsible for designing and implementing user-friendly web applications, collaborating with designers and backend developers to create seamless user experiences.We are looking for a passionate "
    };
    

   
  
   return(
    <JobDescription job={jobData}/>
   )
}

export default Test