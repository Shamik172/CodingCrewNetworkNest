import React, { useContext } from 'react'


import UserPost from './User/UserPost'
import ProfileCard from './Profile/ProfileCard/ProfileCard';
import image from '../assets/doraemon.jpeg';
import image1 from '../assets/cover.jpeg';


import CustomerData from '../Store/CustomerDataProvider';


//data find kar hu json file se 
import data from '../components/Test/data.json'

const Home = () => {
  
   const {userData,userHandler,isLogin, handlerLogin} = useContext(CustomerData);
   
    
  return (
    <>
      
         

          <div className='relative top-24 flex lg:justify-around md:justify-around justify-center'>

             <div className='md:w-1/5  rounded-md md:mx-4 mx-2 mt-2 max-w-56 h-96 shadow-md md:block hidden'>
                {!isLogin ? 
                  <ProfileCard profileImage={''}  coverImage={''} isLogin={isLogin}/>
                  :  //Loading image pending
                   <ProfileCard profileImage={image}  coverImage={image1}  name={userData.name} description={userData.bio} isLogin={isLogin}/>
              
                }
               

             </div>


             <div className='md:w-3/4 w-full md:mx-0  mx-4  max-w-2xl flex flex-col items-center  '>
              
                {data.map(item =>  <UserPost key={item.name} UserProfile={item} isLogin={isLogin}/>)}
           
             </div>
             <div className='bg-red-400 w-1/5 h-96 mx-2 rounded-md mt-2  max-w-56 hidden lg:flex'></div>
          </div>
      
       
          <div className='relative -top-20 h-32'></div>
    </>
   
  )
}

export default Home