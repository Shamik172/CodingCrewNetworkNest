
import React, { useContext } from 'react'
import Navbar from './Heading/Heading'

import CustomerData from '../Store/LoginUserDataProvider';

import MessageSection from './Messages/MessageSection';

const Message = () => {

  const {userData,isLogin} = useContext(CustomerData);
 
   console.log("message::"+userData);
   console.log("myLogin: ", isLogin)
  return (
  
    <div className='w-full bg-slate-300 dark:bg-slate-950   '>
       <div className=''>
      <MessageSection userData={userData}/>
      </div>
   
    </div>
   
  )
}

export default Message