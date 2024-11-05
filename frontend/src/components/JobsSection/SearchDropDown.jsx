import React, { useState } from 'react';

// Sample data for jobs
const jobTitles = ['Software Engineer', 'Product Manager', 'Data Scientist'];
const companies = ['Company A', 'Company B', 'Company C'];
const roles = ['Full-time', 'Part-time', 'Internship'];

// Sample data for locations
const states = {
    usa: {
        'California': ['Los Angeles', 'San Francisco', 'San Diego'],
        'Texas': ['Houston', 'Dallas', 'Austin'],
        'Florida': ['Miami', 'Orlando', 'Tampa']
    },
    canada: {
        'Ontario': ['Toronto', 'Ottawa', 'Hamilton','Toronto', 'Ottawa', 'Hamilton','Toronto', 'Ottawa', 'Hamilton','Toronto', 'Ottawa', 'Hamilton','Toronto', 'Ottawa', 'Hamilton','Toronto', 'Ottawa', 'Hamilton','Toronto', 'Ottawa', 'Hamilton','Toronto', 'Ottawa', 'Hamilton'],
        'British Columbia': ['Vancouver', 'Victoria', 'Burnaby'],
        'Quebec': ['Montreal', 'Quebec City', 'Laval']
    }
};

const SearchDropDown = () => {
    // Job title, company, and role states
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    // Location states
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [locations, setLocations] = useState([]);

    // Handlers for job dropdowns
    const handleJobTitleChange = (e) => setSelectedJobTitle(e.target.value);
    const handleCompanyChange = (e) => setSelectedCompany(e.target.value);
    const handleRoleChange = (e) => setSelectedRole(e.target.value);

    // Handlers for location dropdowns
    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedState('');
        setLocations([]);
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setLocations(states[selectedCountry][state] || []);
    };

    return (
        <div className=" fixed  space-y-4 ">
        <div className='p-4 bg-slate-50 dark:bg-black dark:text-black  rounded-lg  cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3'>
            {/* <h2 className="text-xl mb-4">Select Location</h2> */}
            <div className="mb-1 ">
                {/* <label htmlFor="country" className="block mb-2">Country:</label> */}
                <select 
                    id="country" 
                    value={selectedCountry} 
                    onChange={handleCountryChange} 
                    className="block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select a country</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                </select>
            </div>

            <div className="mb-1 ">
                {/* <label htmlFor="state" className="block mb-2">State:</label> */}
                <select 
                    id="state" 
                    value={selectedState} 
                    onChange={handleStateChange} 
                    className="block w-full p-2 border border-gray-300 rounded"
                    disabled={!selectedCountry}
                >
                    <option value="">Select a state</option>
                    {selectedCountry && Object.keys(states[selectedCountry]).map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            <div className="mb-1 ">
                {/* <label htmlFor="location" className="block mb-2">Location:</label> */}
                <select 
                    id="location" 
                    className="block w-full p-2 border border-gray-300 rounded"
                    disabled={!selectedState}
                >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className='p-4 bg-slate-50 dark:bg-black dark:text-black  rounded-lg  cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3'>
            {/* <h2 className="text-xl mb-4">Select Job Information</h2> */}
            <div className="mb-1">
                {/* <label htmlFor="jobTitle" className="block mb-2">Job Title:</label> */}
                <select 
                    id="jobTitle" 
                    value={selectedJobTitle} 
                    onChange={handleJobTitleChange} 
                    className="block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select a job title</option>
                    {jobTitles.map(title => (
                        <option key={title} value={title}>{title}</option>
                    ))}
                </select>
            </div>

            <div className="mb-1 ">
                {/* <label htmlFor="company" className="block mb-2">Company Name:</label> */}
                <select 
                    id="company" 
                    value={selectedCompany} 
                    onChange={handleCompanyChange} 
                    className="block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select a company</option>
                    {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                    ))}
                </select>
            </div>

            <div className="mb-1 ">
                {/* <label htmlFor="role" className="block mb-2">Role:</label> */}
                <select 
                    id="role" 
                    value={selectedRole} 
                    onChange={handleRoleChange} 
                    className="block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select a role</option>
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>

        </div>    
        </div>
    );
};

export default SearchDropDown;
