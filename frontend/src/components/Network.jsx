import React from 'react'
import Navbar from './Heading/Heading'
import {useContext} from 'react';
import CustomerData from '../Store/LoginUserDataProvider';

const Networ = () => {
  const {userData,userHandler,isLogin, handlerLogin} = useContext(CustomerData);
 console.log("network",userData);
 console.log("my login",isLogin)
  return (
    <div className='text-red-600'>Networ
     
    </div>
  )
}

export default Networ