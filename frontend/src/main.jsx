import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CustomerDataProvider } from './Store/CustomerDataProvider.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/login/Login';
import Home from './components/Home';
import Signup from './components/signup/signup';
import Network from './components/Network';
import Jobs from './components/Jobs';
import Notifications from './components/Notifications';
import Message from './components/Message';
import YourProfile from './components/YourProfile';
import Test from './components/Test/Test';
import { Error } from './Error.jsx'


const router = createBrowserRouter([
  { path: '/', element: <App />,
     errorElement : <Error/>, 
    children : [
      { path: '/', element: <Home /> },
      { path: '/networks', element: <Network /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/message', element: <Message /> },
      { path: '/notifications', element: <Notifications /> },
      { path: '/profile', element: <YourProfile/> },
    ]
   },
  
 
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/test', element: <Test/> },
]);










createRoot(document.getElementById('root')).render(

  <CustomerDataProvider>
      <StrictMode>
      <RouterProvider router={router} />
      </StrictMode>,
  </CustomerDataProvider>
)
