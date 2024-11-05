import React, { useState } from 'react';
import Section from '../Section';

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEducation = () => {
    try{
      
      console.log( formData.schoolName.length)
      if (formData.schoolName.trim().length === 0) {
        throw new Error('School name is required.');
      }
        setEducationList([...educationList, formData]);
        setFormData({ schoolName: '', startDate: '', endDate: '' });
        setFormVisible(false);
        
        
    }catch(error){
      alert(error.message)
    }
    
  };

  const handleRemoveEducation = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  return (
    <Section title={'Education'} onAddClick={() => setFormVisible(true)}>
      {/* Display list of education entries */}
      {educationList.map((education, index) => (
        <div key={index} className="bg-slate-300 shadow-black dark:bg-slate-950  dark:shadow-white p-4 mb-6 rounded shadow-md mx-3"> {/* Increased mb-4 to mb-6 */}
          <p><strong>School Name:</strong> {education.schoolName}</p>
          <p><strong>Start Date:</strong> {education.startDate}</p>
          <p><strong>End Date:</strong> {education.endDate}</p>
          <button
            onClick={() => handleRemoveEducation(index)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}

    
     

      {/* Popup form for adding education */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:text-black p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add Education</h3>
            <label className="block mb-2">
              <span className="text-gray-700">School Name</span>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
                placeholder="Enter school name"
             required />
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
                onClick={handleAddEducation}
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

export default Education;
