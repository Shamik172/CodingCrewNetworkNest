import React, { useState } from 'react'
import ProfileIcon from './loadProfileIcon'




const UserHeader = ({onHandler, isConnection, name, bio, skill, img}) => {



  return (
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
              <button className="text-blue-600 font-medium text-sm mx-3" onClick={onHandler}>
                {!isConnection ? 'follow' : 'unfollow'}</button>
            </p>
            <p className="text-sm">{bio}</p>
            <p className="text-xs">{skill} </p>
          </div>
        </div>
       

        {/* Follow and Close */}
        {/* <div className="flex items-center space-x-4 relative -top-10">
          
          <button className="text-black font-bold text-lg">X</button>
        </div> */}
      </div>
  )
}

export default UserHeader