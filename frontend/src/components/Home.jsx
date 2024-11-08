import React, { useState, useEffect } from 'react'
import Navbar from './Heading/Heading'
import axios from 'axios'
import UserPost from './User/UserPost'
import ProfileCard from './Profile/ProfileCard/ProfileCard';
import image from '../assets/doraemon.jpeg';
import image1 from '../assets/cover.jpeg';


//data find kar hu json file se 
import data from '../components/Test/data.json'

const Home = () => {
  
  
   const [isLogin, setLogin] = useState(false);
   const [userData, setUserData] = useState({});
   const [allPosts, setAllPosts] = useState([{}]);

   const removerData = ()=> {
      setLogin(false);
   }


   useEffect(() => {
       // Fetch the login status and user data from backend
       axios.get('http://localhost:3000/auth/isLogin', { withCredentials: true })
           .then(response => {
               const isLoggedIn = response.data.isLoggedIn;
               setLogin(isLoggedIn);
               if (isLoggedIn) {
                  console.log("data is" ,response.data);
                   setUserData(response.data.user);
                   console.log("New Data is this mf ",userData);
               }
           })
           .catch(error => {
               console.error('Error checking login status:', error);
           });
   }, []);
   // let allPostss = [];

   useEffect(()=>{
      axios.get('http://localhost:3000/post/getAllPosts')
      .then(posts=>{
         console.log("received", posts.data);
         setAllPosts(posts.data);
         console.log(allPosts);
      })
      .catch(err=>console.log(err));
   },[]);

   useEffect(() => {
      console.log("Updated allPosts:", allPosts);
    }, [allPosts]);
    
   // console.log("alllll", allPostss);
    
  return (
    <>
      
          <Navbar isLogin={isLogin} removerData={removerData} userData = {userData}/>

          <div className='relative top-24 flex lg:justify-around md:justify-around justify-center'>

             <div className='md:w-1/5  rounded-md md:mx-4 mx-2 mt-2 max-w-56 h-96 shadow-md md:block hidden'>
                {!isLogin ? 
                  <ProfileCard profileImage={''}  coverImage={''} isLogin={isLogin}/>
                  :  //Loading image pending
                   <ProfileCard profileImage={image}  coverImage={image1}  name={userData.name} description={userData.bio} isLogin={isLogin}/>
              
                }
               

             </div>


             <div className='md:w-3/4 w-full md:mx-0  mx-4  max-w-2xl flex flex-col items-center  '>
              
                {allPosts.map(item =>  <UserPost key={item._id} UserProfile={item} isLogin={isLogin}/>)}
           
             </div>
             <div className='bg-red-400 w-1/5 h-96 mx-2 rounded-md mt-2  max-w-56 hidden lg:flex'></div>
          </div>
      
       
          <div className='relative -top-20 h-32'></div>
    </>
   
  )
}

export default Home