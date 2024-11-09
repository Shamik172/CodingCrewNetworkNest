
import React, { useContext } from 'react'
import Navbar from './Heading/Heading'
import CustomerData from '../Store/CustomerDataProvider';
import MessageSection from './Messages/MessageSection';
const Message = () => {

  const {userData,isLogin} = useContext(CustomerData);
 
   console.log("message::"+userData);
   console.log("myLogin: ", isLogin)
  return (
  
    <div className='relative top-20'>
      <MessageSection userData={userData}/>
   
    </div>
   
  )
}

export default Message