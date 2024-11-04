import React, { useState } from 'react';
import { IoIosAddCircleOutline, IoIosTrash } from "react-icons/io"; // Import delete icon
import Section from "../Section";

const Project = () => {
  const [projects, setProjects] = useState([]); // Holds the list of projects
  const [newProject, setNewProject] = useState({ title: '', description: '', tags: '' });
  const [file, setFile] = useState(null); // Holds the uploaded file
  const [showForm, setShowForm] = useState(false); // Toggles the form visibility

  // Add a new project to the list
  const addProject = () => {
    if (newProject.title && newProject.description && file) {
      const newProjectWithFile = { ...newProject, file };
      setProjects([...projects, newProjectWithFile]);
      setNewProject({ title: '', description: '', tags: '' });
      setFile(null);
      setShowForm(false); // Close the form after adding the project
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to toggle the form visibility
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // Function to delete a project
  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <Section title="Project" onAddClick={toggleForm}>
      <div className="py-8 px-4 relative">
        {/* Display Projects with dark theme */}
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center md:space-x-8 my-8 bg-gray-800 text-white p-4 rounded-lg relative">
            
            {/* Delete Icon */}
            <button
              onClick={() => deleteProject(index)} // Call delete function
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <IoIosTrash size={24} />
            </button>

            {/* Left Side - Image or Video */}
            <div className="flex flex-col items-center md:items-end md:w-1/2">
              <div className="border border-gray-700 rounded-lg overflow-hidden w-full md:w-3/4">
                {project.file && project.file.type.startsWith('video') ? (
                  <video controls src={URL.createObjectURL(project.file)} className="w-full" />
                ) : (
                  <img src={URL.createObjectURL(project.file)} alt={`${project.title} screenshot`} className="w-full" />
                )}
              </div>
            </div>

            {/* Middle Line */}
            <div className="hidden md:block h-full border-l-2 border-gray-600 mx-8"></div>
            
            {/* Right Side - Description */}
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-4xl font-semibold text-orange-500">{project.title}</h2>
              <p className="text-lg">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.split(',').map((tag, i) => (
                  <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-sm">{`#${tag.trim()}`}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Add Project Form */}
        {showForm && (
          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Add a New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Project Tags (comma-separated)"
              value={newProject.tags}
              onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full p-2 mb-4 text-white"
            />
            <button onClick={addProject} className="w-full p-2 rounded bg-green-500 text-white flex items-center justify-center">
              <IoIosAddCircleOutline size={24} className="mr-2" /> Add Project
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Project;
