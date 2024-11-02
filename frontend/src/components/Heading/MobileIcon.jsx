import React from 'react'
import { FaHome, FaUserFriends, FaBriefcase, FaEnvelope, FaBell, FaUserCircle } from "react-icons/fa";

export const MobileIcon = ({Icon, IconTitle,url }) => {
  return (
    <a href={url} className="flex items-center text-sm font-serif hover:text-white p-1"><Icon className="mr-2" size={18} />{IconTitle}</a>
  )
}
