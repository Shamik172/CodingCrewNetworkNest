// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/login/Login"; // Adjust the path as needed
// import Signup from "./components/signup/signup"; // Adjust the path as needed

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* Redirect or default route */}
//           <Route path="*" element={<Login />} /> {/* Redirects to login if no path is matched */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { useState } from 'react'
import './App.css'

import Login from './Components/Login/Login'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Components/Home'
import Test from './Components/Test/Test'
import Network from './Components/Network'
import Jobs from './Components/Jobs'
import Notifications from './Components/Notifications'
import Message from './Components/Message'
import YourProfile from './Components/YourProfile'

// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
 
   const router = createBrowserRouter([
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/networks",
        element: <Network/>
      },
      {
        path:"/jobs",
        element: <Jobs/>
      },
      {
        path:"/message",
        element: <Message/>
      },
      {
        path:"/notifications",
        element: <Notifications/>
      },
      {
        path:"/profile",
        element: <YourProfile/>
      },
   ])

  return (
    
       <div className='img-set'>
          
          <RouterProvider router={router}/>
       </div>
    
  )
}

export default App

