import React, { useEffect, useRef } from "react";

const ConnectionDetails = ({ user, onClose }) => {
  const modalRef = useRef(null);

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Close modal if click is outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef} // Ref to the modal content
        className="bg-white p-6 rounded-lg shadow-xl w-11/12 lg:w-1/3 max-w-2xl"
      >
        <div className="space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Cover Picture */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/600x200"
              alt="Cover"
              className="w-full h-32 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center -mt-12">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* User Name and Location */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-1">{user.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{user.location || "City, Country"}</p>
          </div>

          {/* Skills Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Skills</h4>
            <p className="text-gray-600 text-sm">{user.skills || "N/A"}</p>
          </div>

          {/* Experience Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Experience</h4>
            <p className="text-gray-600 text-sm">{user.experience || "No experience provided"}</p>
          </div>

          {/* Education Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Education</h4>
            <p className="text-gray-600 text-sm">{user.education || "No education info provided"}</p>
          </div>

          {/* Projects Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Projects</h4>
            <p className="text-gray-600 text-sm">{user.projects || "No projects listed"}</p>
          </div>

          {/* Bio Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Bio</h4>
            <p className="text-gray-600 text-sm">{user.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDetails;
