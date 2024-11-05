import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/Home';
import Signup from './components/signup/signup';
import Network from './components/Network';
import Jobs from './components/Jobs';
import Notifications from './components/Notifications';
import Message from './components/Message';
import YourProfile from './components/YourProfile';
import Test from './components/Test/Test';
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useState, useEffect } from 'react';
function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/networks', element: <Network /> },
    { path: '/jobs', element: <Jobs /> },
    { path: '/message', element: <Message /> },
    { path: '/notifications', element: <Notifications /> },
    { path: '/profile', element: <YourProfile /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/test', element: <Test/> },
  ]);


  //to toggle theme 
   const [theme, setTheme] = useState(null);

   useEffect(()=>{
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setTheme('dark');
      }else{
        setTheme('light');
      }
   }, []);


   useEffect(()=>{
    if(theme === 'dark'){
       document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
   }, [theme]);

   const handleThemeSwitch = ()=>{
     setTheme(theme === 'dark' ? 'light' : 'dark');
   }
  




  return (
    <div className="bg-slate-300 dark:bg-slate-950">
      <button className='text-black bg-white dark:bg-black dark:text-white
       rounded-full size-10 flex justify-center items-center  z-[100] fixed md:left-[12.5%] sm:left-[15%] md:top-[2%] sm:top-[1.2%] top-[1.9%] left-[18%] cursor-pointer  text-sm ring-offset-2 ring-2' onClick={handleThemeSwitch} >
      {theme === 'dark'?  <MdOutlineDarkMode size={30}/>  :<MdOutlineLightMode size={30} />}
      </button>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
