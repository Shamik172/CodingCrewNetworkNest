import React, { useState } from 'react';
import FromComponents from './FromComponents'

const JobPostingForm = ({returnData}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: '',
    role: '',
    salary: '',
    location: '',
    city: '',
    jobType: '',
    requiredSkills: '',
    experience: '',
    qualification: '',
    createdBy: '',
    applicationDeadline: '',
    jobDescription: ''
  });

  const [showJobPosting, setShowJobPosting] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;
    
    // console.log(name+" : "+value);

    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData)

  const handleSubmit = (e) => {
    // console.log(formData);
    returnData(formData);
    e.preventDefault();
    setFormData({
      companyName: '',
      companyLogo: '',
      role: '',
      salary: '',
      location: '',
      city: '',
      jobType: '',
      requiredSkills: '',
      experience: '',
      qualification: '',
      createdBy: '',
      applicationDeadline: '',
      jobDescription: ''
    })
    
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-6">Create Job Posting</h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white  p-6 shadow-md rounded-lg">
        <FromComponents title={'Company Name'} name={'companyName'} data={formData.companyName} type={'text'} handleChange={handleChange} isRequired={true}/>
        <FromComponents title={'Company Logo URL'} name={'companyLogo'} data={formData.companyLogo} type={'text'} handleChange={handleChange} isRequired={false} />
        <FromComponents title={'Role'} name={'role'} data={formData.role} type={'text'} handleChange={handleChange} isRequired={true}/>
        <FromComponents title={'Salary'} name={'salary'} data={formData.salary} type={'text'} handleChange={handleChange} isRequired={false}/>
        <FromComponents title={'Location'} name={'location'} data={formData.location} type={'text'} handleChange={handleChange} isRequired={true}/>
        <FromComponents title={'City'} name={'city'} data={formData.city} type={'text'} handleChange={handleChange} isRequired={false}/>
        <FromComponents title={'Job Type'} name={'jobType'} data={formData.jobType} type={'text'} handleChange={handleChange} isRequired={true}/>
        <FromComponents title={'Required Skills (comma separated)'} name={'requiredSkills'} data={formData.requiredSkills} type={'text'} handleChange={handleChange} isRequired={false}/>
        <FromComponents title={'Experience'} name={'experience'} data={formData.experience} type={'text'} handleChange={handleChange} isRequired={false}/>
        <FromComponents title={'Qualification'} name={'qualification'} data={formData.qualification} type={'text'} handleChange={handleChange} isRequired={false}/>
        <FromComponents title={'Created By'} name={'createdBy'} data={formData.createdBy} type={'text'} handleChange={handleChange} isRequired={false}/>
       
        <FromComponents title={'Application Deadline'} name={'applicationDeadline'} data={formData.applicationDeadline} type={'date'} handleChange={handleChange} isRequired={false}/>
        
        <div className="mb-4">
          <label className="block text-gray-700">Job Description <sub className='text-red-600'>*</sub></label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Job Posting
        </button>
      </form>
        
    </div>
  );
};

export default JobPostingForm;
