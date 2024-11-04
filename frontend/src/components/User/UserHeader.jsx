import React, { useState } from 'react'
import ProfileIcon from './loadProfileIcon'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';



const UserHeader = ({onHandler, isConnection, name, bio, skill, img, isLogin}) => {
  
  // const navigate = useNavigate();
  const [showModal, setModal] = useState(false);


  const handleClick = (e) => {
    // console.log("isLogin:", isLogin);  // Check if isLogin is recognized correctly
    if (isLogin) {
      onHandler();
    } else {
      setModal(true);
    
      // //  Confirm this log prints
      //  alert('you have not login');
      // try {
      //   navigate('/login');
      // } catch (error) {
      //   // console.error("Navigation error:", error);
      //   // Alternative navigation if navigate fails
        
      //   window.location.href = '/login';
      // }  
    }
  };

  return (

    <>
      
      <div className="flex flex-row items-center justify-between px-4 p-2 font-serif bg-slate-200">
        {/* Profile Picture and Info */}
        <div className="flex items-center mb-4 sm:mb-0  font-mono">
          <div className="w-12 h-12 rounded-full mr-3  ">

          <ProfileIcon userName={name} imageUrl={img}/>
          </div>
          <div>
            <p className="font-semibold text-2xl font-serif ">
              <span className='text-sky-950 shodow capitalize'>
                {name}
              </span>
              <button className="text-blue-600 font-medium text-sm mx-3" onClick={handleClick}>
                {!isConnection ? 'follow' : 'unfollow'}</button>
            </p>
            <p className="text-sm">{bio}</p>
            <p className="text-xs">{skill} </p>
          </div>
        </div>
      </div>

      {(showModal  && <Modal  setModalHandler={()=>{setModal(false)}}/>)}
    
    </>


   
  )
}

export default UserHeader