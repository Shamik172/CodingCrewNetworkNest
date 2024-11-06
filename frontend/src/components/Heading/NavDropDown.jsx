import React, { useState, useRef, useEffect } from 'react';
import img from '../../assets/avengers.jpg'
const NavDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (

    
    <div className="relative inline-block text-left top-1" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full size-10 rounded-full  shadow-sm text-sm font-medium text-gray-700   ring-white ring "
        >
          <img src={img} alt="" className='size-10 rounded-full min-w-10'/>
          
        </button>
      </div>

      {isOpen && (
        <>
        
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md r shadow-sm  border dark:border-slate-800 bg-white dark:bg-black dark:text-white ring-1 ring-black ring-opacity-5 dark:shadow-white">
          <div className=" divide-y dark:divide-slate-800" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/profile" className="rounded-t-md block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800 " role="menuitem">
              Profile
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800" role="menuitem">
              Settings
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800" role="menuitem ">
              Add Cart
            </a>
            <a href="/logout" className="rounded-b-md block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800" role="menuitem">
              Logout
            </a>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default NavDropDown;
