import React, { useState } from 'react';
import Section from '../Section';
import { FaPlus } from 'react-icons/fa';

const Experience = () => {
  const [experienceList, setExperienceList] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddExperience = () => {
    setExperienceList([...experienceList, formData]);
    setFormData({ jobTitle: '', companyName: '', startDate: '', endDate: '' });
    setFormVisible(false);
  };

  const handleRemoveExperience = (index) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  return (
    <Section title={'Work Experience'} onAddClick={() => setFormVisible(true)}>
      {/* Display list of job entries */}
      {experienceList.map((experience, index) => (
        <div key={index} className="bg-white p-4 mb-6 rounded shadow-md">
          <p><strong>Job Title:</strong> {experience.jobTitle}</p>
          <p><strong>Company Name:</strong> {experience.companyName}</p>
          <p><strong>Start Date:</strong> {experience.startDate}</p>
          <p><strong>End Date:</strong> {experience.endDate}</p>
          <button
            onClick={() => handleRemoveExperience(index)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}


      {/* Popup form for adding experience */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add Work Experience</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Job Title</span>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
                placeholder="Enter job title"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Company Name</span>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
                placeholder="Enter company name"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Start Date</span>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">End Date</span>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={() => setFormVisible(false)}
                className="text-gray-600 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Experience;
