import React from 'react'
import Navbar from './Heading/Heading'
import {useContext} from 'react';
import CustomerData from '../Store/LoginUserDataProvider';
import Connection from './Connections/Connections';

const Network = () => {
  const {userData,userHandler,isLogin, handlerLogin} = useContext(CustomerData);
 console.log("network",userData);
 console.log("my login",isLogin)
  return (
    <div className=' w-full bg-slate-300 dark:bg-slate-950 min-h-screen relative top-0 left-0 right-0 bottom-0 pt-20 '>
      <div className=' text-white '>
        <Connection/>
      </div>
     
    </div>
  )
}

export default Network