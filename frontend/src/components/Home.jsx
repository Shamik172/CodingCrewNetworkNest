import React, { useState } from 'react'
import Navbar from './Heading/Heading'
import UserProfileCard from './User/UserProfileCard'
import ProfileCard from './Profile/ProfileCard/ProfileCard';
import image from '../assets/doraemon.jpeg';
import image1 from '../assets/cover.jpeg';

//data find kar hu json file se 
import data from '../components/Test/data.json'

const Home = () => {

    const [isLogin, setLogin] = useState(false);
    
  return (
    <>
      
          <Navbar isLogin={isLogin}/>

          <div className='relative top-24 flex lg:justify-around md:justify-around justify-center'>

             <div className='md:w-1/5  rounded-md md:mx-4 mx-2 mt-2 max-w-56 h-96 shadow-md md:block hidden'>
                {!isLogin ? 
                  <ProfileCard profileImage={''}  coverImage={''} isLogin={isLogin}/>
                  :
                   <ProfileCard profileImage={image}  coverImage={image1}  name="Sumanta sahoo" description={'MNNIT26 MCA'} isLogin={isLogin}/>
              
                }
               

             </div>


             <div className='md:w-3/4 w-full md:mx-0  mx-4  max-w-2xl flex flex-col items-center  '>
              
                {data.map(item =>  <UserProfileCard key={item.name} UserProfile={item} isLogin={isLogin}/>)}
           
             </div>
             <div className='bg-red-400 w-1/5 h-96 mx-2 rounded-md mt-2  max-w-56 hidden lg:flex'></div>
          </div>
      
       

    </>
   
  )
}

export default Home