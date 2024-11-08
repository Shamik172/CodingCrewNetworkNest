/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CoverPic from './CoverPic';
import axios from 'axios';

import NameAndBio from './NameAndBio';
import Modal from './EditModel';

function ProfileSection({userId}) {
// console.log(userId);
  const [file, setFile] = useState(null);
  
  const [profile, setProfile] = useState({
    username: 'Dummy User',
    name: 'Dummy User',
    bio: 'In love with you',
    profilePicture: 'https://via.placeholder.com/150',
    coverPicture: 'https://via.placeholder.com/600x200',
    email: 'johndoe@example.com'
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/profilePage/${userId}`, { withCredentials: true });
        // Set the fetched skills data in the state
        // console.log(response.data.coverPicture.length);
          setProfile((prevProfile) => {
            // Filter out null or undefined values from response.data
            const validData = Object.fromEntries(
              Object.entries(response.data).filter(([key, value]) => value != null)
            );
            
            return {
              ...prevProfile,
              ...validData, // Only update with non-null and non-undefined values
              profilePicture: validData.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqC7jaYkUxXArH-BrVsMkPgT7fDVfhJC9MRYosWZ32LPIA1NDcuLRUR4&s', 
              coverPicture: validData.coverPicture || 'https://via.placeholder.com/600x200',
            };
          });
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchProfile(); // Call the function to fetch the skills
  }, [userId]);

  const handleImageChange = async (e, imageType) => {
    // const { files } = e.target;
    // if (files && files[0]) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     setProfile((prev) => ({ ...prev, [type]: event.target.result }));
    //   };
    //   reader.readAsDataURL(files[0]);
    // }
    const file_t = e.target.files[0];
    setFile(file_t);
    // const fileType = file_t.fileType;
    // const formData = new FormData();
    // formData.append("imageType", imageType);
    // formData.append("fileType", fileType);
    // formData.append("file", file);
    // console.log(formData)
    // console.log("fike",formData);

  try {
    const response = await axios.post(
      `http://localhost:3000/user/${imageType}/${userId}`, 
      
      { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
    );
    
    // Update the profile state with the new image URL
    setProfile((prevProfile) => ({
      ...prevProfile,
      [imageType]: response.data[imageType],
    }));
  } catch (error) {
    console.error('Error uploading image:', error);
  }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl md:mx-auto p-6 bg-white dark:bg-black  shadow-sky-700 shadow-md  rounded-lg relative top-20 mx-2">
      <div className="relative">
        {/* Cover Picture */}
        <CoverPic
          coverPicture={profile.coverPicture}
          />
        <button
          onClick={() => setIsCoverModalOpen(true)}
          className="absolute top-2 right-2 px-2 py-1 bg-gray-700 text-white rounded-md"
        >
          Edit Cover
        </button>

        {/* Profile Picture */}
        <div className="absolute top-24 left-6">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className=" relative top-12 size-28 rounded-full border-4 px-2 py-1 bg-gray-700 text-white  text-sm "
          >
            <img src={profile.profilePicture} alt="" className='rounded-full bg-no-repeat bg-center bg-cover ' />     {/* size-24 */}
        
          </button>
        </div>
      </div>



      <div className="mt-16 text-center">
        {/*  Name and Bio */}
        <NameAndBio
          name={profile.name}
          bio={profile.bio}
        />

        <button
          onClick={() => setIsInfoModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Edit Profile Info
        </button>
      </div>

      {/* Profile Content */}
      <div className="mt-6 px-10">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-purple-500">Username:</h2>
        <p className="text-sm text-gray-500 mb-4 relative left-10 dark:text-white">{profile.username}</p>

        <h2 className="text-lg font-semibold text-gray-800  dark:text-purple-500">Email:</h2>
        <p className="text-sm text-gray-500 mb-4 relative left-10 dark:text-white">{profile.email}</p>
      </div>




      {/* Edit Cover Picture Modal */}
      <Modal isOpen={isCoverModalOpen} onClose={() => setIsCoverModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Edit Cover Picture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'coverPicture')}
          className="mt-2"
        />
        <button
          onClick={() => setIsCoverModalOpen(false)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
        >
          Save Cover Picture
        </button>
      </Modal>

      {/* Edit Profile Picture Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Edit Profile Picture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'profilePicture')}
          className="mt-2"
        />
        <button
      onClick={() => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileType", file);
            console.log(file)
            console.log(formData);
              setIsProfileModalOpen(false)}}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
        >
          Save Profile Picture
        </button>
      </Modal>

      {/* Edit Profile Info Modal */}
      <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Edit Profile Information</h3>
        <div className="mb-4">  
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <input
            type="text"
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          onClick={() => {
            
            setIsInfoModalOpen(false);}}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
        >
          Save Changes
        </button>
      </Modal>
    </div>
  );
}

export default ProfileSection;
