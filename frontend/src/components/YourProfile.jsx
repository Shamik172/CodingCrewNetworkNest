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
      <Navbar/>
      <ProfileSection/>
      <Skills/>
      <Project/>
      <Experience/>
      <Education/>
   </>
  )
}

export default YourProfile