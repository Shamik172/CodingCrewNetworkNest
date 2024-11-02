import React, { useState } from "react";
import { FaHome, FaUserFriends, FaBriefcase, FaEnvelope, FaBell, FaUserCircle } from "react-icons/fa";  // Import icons from React Icons
import Search from "./Search";
import Logo from "./Logo";
import { NavIcon } from "./NavIcon";
import { MobileIcon } from "./MobileIcon";
import img from "../../assets/image1.jpeg"



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const TitleIconObject = [
    {IconTitle : 'Home', Icon: FaHome, url: '/'},
    {IconTitle : 'Network', Icon: FaUserFriends, url: '/networks'},
    {IconTitle : 'Jobs', Icon: FaBriefcase, url: '/jobs'},
    {IconTitle : 'Messaging', Icon: FaEnvelope, url: '/message'},
    {IconTitle : 'Notifications', Icon: FaBell, url: '/notifications'},
    {IconTitle : 'Profile', Icon: FaUserCircle, url: '/profile'},
  ]

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Add search functionality here
  };

  return (
    <nav className="bg-primary-color border-b  border-primary-color px-4 sm:px-8 py-2 shadow-md fixed w-full top-0 z-10 text-Light-Beige">

      <div className="flex items-center justify-between ">
         {/* Logo */}
         <Logo logoName={img}/>

         {/* Search Bar */}
         <form  onSubmit={handleSearchSubmit}
            className="flex items-center w-full max-w-md mx-4 ">
            <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery}/>
          </form>
         



         {/* Icons with Tooltips Below for Desktop */}
         <div className="hidden md:flex space-x-6 items-center text-Light-Beige relative">
            {TitleIconObject.map(item => <NavIcon key={item.IconTitle} Icon={item.Icon} IconTitle={item.IconTitle} url={item.url}/> )}
         </div>


        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-Light-Beige focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="5 3 20 20" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-Light-Beige ">
           
            {TitleIconObject.map(item=> <MobileIcon Icon={item.Icon} IconTitle={item.IconTitle} url={item.url}/>)}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
