import React, { createContext, useState } from 'react';

export const CreatedJobData = createContext();

export const LoginUserCreatsJobsDataProvider = ({ children }) => {
  const obj = {
    role: 'Spring Boot',
    salary: 3204593,
    city: "Chennai",
    jobType: "intern",
    applicationDeadline : "03-10-2003"

  }
  
  const [createdJob, setCreatedJob] = useState([obj]); // Fixed typo here

  // console.log(Array.isArray(createdJob));

  const handlerStoreData = (newJobCreateData) => {
    // console.log(newJobCreateData);
    setCreatedJob((currentItems) => {
      // console.log(currentItems);
      return [...currentItems, newJobCreateData];
    });
  };

  return (
    <CreatedJobData.Provider value={{ createdJob, handlerStoreData }}>
      {children}
    </CreatedJobData.Provider>
  );
};
