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
  ]);

  return (
    <div className="bg-fixed">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
