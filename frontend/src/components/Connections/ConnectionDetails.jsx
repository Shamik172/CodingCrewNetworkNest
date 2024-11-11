import React from "react";
import { DarkandLightTheme } from "../../DarkandLightTheme";
import { useParams } from "react-router-dom";

const ConnectionDetails = () => {
  const user = {
    name: "John Doe",
    gender:'male',
    location: "New York, USA",
    skills: "JavaScript, React, Node.js",
    experience: "5 years of experience in web development, focusing on front-end technologies.",
    education: "Bachelor's Degree in Computer Science, XYZ University",
    projects: "Project A: E-commerce website. Project B: Social media app.",
    bio: "Passionate about coding, solving problems, and continuously learning new technologies."
  };
 const params = useParams();
 console.log('hiii',params)
 user.name = params.userid;


  return (
    <>
    <div className="min-h-screen bg-slate-300 dark:bg-slate-950 p-6">
      <div className=" bg-white dark:bg-black p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-4 dark:shadow-sky-700">
        {/* Cover Picture */}
        <div className="relative top-3 ">
          <img
            src="https://via.placeholder.com/600x200"
            alt="Cover"
            className="w-full md:h-60  object-cover rounded-lg shadow-md dark:shadow-md dark:shadow-slate-500"
          />
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center relative md:-top-20 sm:-top-14 -top-12">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="md:size-32 sm:size-28 size-20 rounded-full border-4 border-white dark:border-gray-600 shadow-md"
          />
        </div>

        {/* User Name and Location */}
        <div className="text-center relative md:-top-16 -top-10">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-purple-600 mb-1">
          {user.name} <span className="text-lg">({user.gender})</span>
        </h3>
          <p className="text-gray-600 dark:text-orange-500 text-sm mb-4">{user.location || "City, Country"}</p>
        </div>
      
        {/* Skills Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 dark:text-sky-600">Skills</h4>
          <p className="text-gray-600 text-sm dark:text-white">{user.skills || "N/A"}</p>
        </div>

        {/* Experience Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800  dark:text-sky-600">Experience</h4>
          <p className="text-gray-600 text-sm dark:text-white">{user.experience || "No experience provided"}</p>
        </div>

        {/* Education Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800  dark:text-sky-600 ">Education</h4>
          <p className="text-gray-600 text-sm dark:text-white">{user.education || "No education info provided"}</p>
        </div>

        {/* Projects Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800  dark:text-sky-600">Projects</h4>
          <p className="text-gray-600 text-sm dark:text-white">{user.projects || "No projects listed"}</p>
        </div>

        {/* Bio Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800  dark:text-sky-600">Bio</h4>
          <p className="text-gray-600 text-sm dark:text-white">{user.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6 dark:border-blue-700"></div>

       
      
      </div>
    </div>
    <div className=" bg-slate-300 dark:bg-slate-950 p-6">
      <div className=" bg-white dark:bg-black p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-6  dark:text-sky-600 dark:shadow-sky-700">
        Post
      </div>  
    </div>
    <DarkandLightTheme/>
    </>
  );
};

export default ConnectionDetails;
