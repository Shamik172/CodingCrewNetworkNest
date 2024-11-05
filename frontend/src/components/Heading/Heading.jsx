import React, { useState } from "react";
import { FaHome, FaUserFriends, FaBriefcase, FaEnvelope, FaBell, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Link for client-side routing
import Search from "./Search";
import Logo from "./Logo";
import { NavIcon } from "./NavIcon";
import { MobileIcon } from "./MobileIcon";
import img from "../../assets/image1.jpeg";
import NavDropDown from "./NavDropDown";

function Navbar({ isLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Get the current path

  const TitleIconObject = [
    { IconTitle: "Home", Icon: FaHome, url: "/" },
    { IconTitle: "Network", Icon: FaUserFriends, url: "/networks" },
    { IconTitle: "Jobs", Icon: FaBriefcase, url: "/jobs" },
    { IconTitle: "Messaging", Icon: FaEnvelope, url: "/message" },
    { IconTitle: "Notifications", Icon: FaBell, url: "/notifications" },
  ];

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Add search functionality here
  };

  return (
    <nav className="bg-primary-color border-b border-primary-color px-4 sm:px-8 py-2 shadow-md fixed w-full top-0 z-[60] text-Light-Beige">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo logoName={img} />

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full max-w-md mx-4">
          <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
        </form>

        {/* Icons with Tooltips Below for Desktop */}
        {isLogin ? (
          <div className="hidden md:flex space-x-6 items-center text-Light-Beige relative">
            {TitleIconObject.map((item) => (
              <NavIcon
                key={item.IconTitle}
                Icon={item.Icon}
                IconTitle={item.IconTitle}
                url={item.url}
                isActive={location.pathname === item.url} // Check if the current path matches
              />
            ))}
            <div className="relative">
               <NavDropDown />
            </div>
           
          </div>
        ) : (
          <div className="flex space-x-6 items-center text-Light-Beige relative">
            <NavIcon
              key={TitleIconObject[0].IconTitle}
              Icon={TitleIconObject[0].Icon}
              IconTitle={TitleIconObject[0].IconTitle}
              url={TitleIconObject[0].url}
              isActive={location.pathname === TitleIconObject[0].url} // Check if the current path matches
            />
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 size-10 border-none text-sm p-1 mx-1 flex justify-center items-center rounded-full text-white box-content relative cursor-pointer"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-sky-500 to-indigo-500 size-10 border-none text-sm p-1 mx-1 flex justify-center items-center rounded-full text-white box-content relative cursor-pointer"
              >
                Signup
              </Link>
            </div>
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
        {isLogin && (
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-Light-Beige focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="5 3 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-Light-Beige">
          {TitleIconObject.map((item) => (
            <MobileIcon
              key={item.IconTitle}
              Icon={item.Icon}
              IconTitle={item.IconTitle}
              url={item.url}
              isActive={location.pathname === item.url} // Check for active path in mobile view
            />
          ))}

          <MobileIcon
            key={"profile"}
            Icon={FaUserCircle}
            IconTitle={"Profile"}
            url={"/profile"}
            isActive={location.pathname === "/profile"} // Check for active path in mobile view
          />
   



            {/* to impements */}
          <div>Settings</div>
          <div>Logout</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
