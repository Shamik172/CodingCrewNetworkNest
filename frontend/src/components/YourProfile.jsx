import React from 'react'
import Navbar from './Heading/Heading'
import ProfileSection from './Profile/Profile'
import Skills from './Profile/Skills/Skills'
import Project from './Profile/Project/Project'
import Experience from './Profile/Experience/Experience'
import Education from './Profile/Education/Education'
const YourProfile = () => {
  return (
   <>
      <div className='flex md:justify-center md:space-x-10 justify-center'>
                <Navbar isLogin={true}/>
            <div className='relative top-20 h-96 w-60   hidden md:flex flex-col rounded-lg p-5  bg-white dark:bg-black text-black dark:text-white'>
                 <div className='text-xl font-semibold border-b-2 dark:border-blue-950 pb-2'>Connection:
                     <span className=' ml-2 font-light relative top-0.5'>3<sup>+</sup></span>
                 </div>
                 <div className='space-y-2'>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                    <div>Sumanta</div>
                 </div>
                
            </div>
            <div>
               
                <ProfileSection/>
                <Skills/>
                <Project/>
                <Experience/>
                <Education/>
            </div>
        
      </div>
      <div className='relative -top-20 h-20 -z-10'></div>
      
   </>
  )
}

export default YourProfile