import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import AOS from 'aos'; // Import AOS for initialization
import 'aos/dist/aos.css'; // Import the AOS CSS for animations

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
        'Ontario': ['Toronto', 'Ottawa', 'Hamilton'],
        'British Columbia': ['Vancouver', 'Victoria', 'Burnaby'],
        'Quebec': ['Montreal', 'Quebec City', 'Laval']
    }
};

const SearchDropDown = () => {
    // Initialize AOS animation
    useEffect(() => {
        AOS.init({
            duration: 1000, // Duration of the animation
            easing: 'ease-in-out', // Easing function for the animation
            once: true, // Only animate once when scrolled into view
        });
    }, []);

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

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            {/* Top bar for mobile view */}
            <button 
                onClick={toggleMobileMenu} 
                className="text-gray-800 dark:text-white text-xl flex items-center justify-between sm:w-2/3 w-full m-auto bg-slate-50 dark:bg-gray-900 p-4 md:hidden shadow-lg z-50"
            >   
                <h1 className="text-xl font-semibold dark:text-white">Job Filter</h1>
                <IoIosArrowDown />
            </button>

            {/* Mobile pop-up menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 sm:w-2/3 m-auto sm:h-2/3 bg-slate-50 dark:bg-gray-900 p-6 z-50 overflow-y-auto transition-opacity duration-300 ease-in-out">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
                    >
                        Close
                    </button>

                    <div className="space-y-4">
                        {/* Location and Job Dropdowns */}
                        <div className="space-y-3">
                            <select 
                                id="country" 
                                value={selectedCountry} 
                                onChange={handleCountryChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a country</option>
                                <option value="usa">United States</option>
                                <option value="canada">Canada</option>
                            </select>

                            <select 
                                id="state" 
                                value={selectedState} 
                                onChange={handleStateChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                                disabled={!selectedCountry}
                            >
                                <option value="">Select a state</option>
                                {selectedCountry && Object.keys(states[selectedCountry]).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>

                            <select 
                                id="location" 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                                disabled={!selectedState}
                            >
                                <option value="">Select a location</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <select 
                                id="jobTitle" 
                                value={selectedJobTitle} 
                                onChange={handleJobTitleChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a job title</option>
                                {jobTitles.map(title => (
                                    <option key={title} value={title}>{title}</option>
                                ))}
                            </select>

                            <select 
                                id="company" 
                                value={selectedCompany} 
                                onChange={handleCompanyChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a company</option>
                                {companies.map(company => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>

                            <select 
                                id="role" 
                                value={selectedRole} 
                                onChange={handleRoleChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a role</option>
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <button className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Filter
                        </button>
                    </div>
                </div>
            )}

            {/* PC view */}
            <div data-aos="fade-in" data-aos-delay="500" className="md:flex flex-col absolute hidden space-y-3 text-center">
                <a href='/test' className="px-6 py-2 bg-slate-50 dark:bg-sky-950 hover:bg-slate-300 dark:hover:bg-sky-800 dark:text-white rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3">
                    Create Job+
                </a> 
                <a className="px-6 py-2 bg-slate-50 dark:bg-sky-950 dark:text-white hover:bg-slate-300 dark:hover:bg-sky-800 rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3">
                    Past Job
                </a> 
                <div className='p-4 bg-slate-50 dark:bg-black dark:text-black rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3'>
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

                <div className='p-4 bg-slate-50 dark:bg-black dark:text-black rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3'>
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

                <button className="py-2 px-6 bg-slate-50 dark:bg-black rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3 dark:text-purple-600 dark:hover:bg-slate-800 hover:bg-slate-300">
                    Filter
                </button> 
            </div>
        </>
    );
};

export default SearchDropDown;
