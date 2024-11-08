
import React, { useContext } from 'react'
import Navbar from './Heading/Heading'
import CustomerData from '../Store/CustomerDataProvider';
const Message = () => {

  const {userData,isLogin} = useContext(CustomerData);
 
   console.log("message::"+userData);
   console.log("myLogin: ", isLogin)
  return (
  
    <div className='text-red-600'>Message
   
    </div>
   
  )
}

export default Message