import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import UserPost from './User/UserPost'
import ProfileCard from './Profile/ProfileCard/ProfileCard';
// import image from '../assets/doraemon.jpeg';
// import image1 from '../assets/cover.jpeg';

import PostButton from './Profile/ProfileCard/PostButton';
import CustomerData from '../Store/LoginUserDataProvider';
import Post from './Profile/ProfileCard/Post';
import vd from '../assets/video1.mp4'



const Home = () => {
  

   const {userData,userHandler,isLogin, handlerLogin} = useContext(CustomerData);
   const [showSendPost, setShowSendPost] = useState(false);


   

   // const [isLogin, setLogin] = useState(false);
   // const [userData, setUserData] = useState({});
   const [allPosts, setAllPosts] = useState([{}]);


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

    
  return (
    <>
      

          <div className='relative top-24 flex lg:justify-around md:justify-around justify-center '>

            


            {/* to show min-width  */}
             <div className='md:w-1/5  rounded-md md:mx-4 mx-2 mt-2 max-w-56 h-96 shadow-md lg:block hidden'>

                {!isLogin ? 
                  <ProfileCard profileImage={''}  coverImage={''} isLogin={isLogin}/>
                  :  //Loading image pending
                  <ProfileCard profileImage={userData.profilePicture}  coverImage={userData.coverPicture}  name={userData.name} description={userData.bio} isLogin={isLogin}/>
              
                }

             </div>


             <div className='md:w-3/4 w-full md:mx-0  mx-4  max-w-2xl flex flex-col items-center  '>


                    {/* below lg part */}
                  <div className='dark:bg-slate-900 bg-slate-200 dark:text-white  w-full mx-2 rounded-md mt-2 lg:hidden   mb-2 py-3'>
                  
                  <PostButton view={'mobile'} setShowSendPost={setShowSendPost}/>
                  </div>
  
                  {allPosts.map(item =>  <UserPost key={item._id} UserProfile={item} isLogin={isLogin}/>)}

           
             </div>


             {/* third part lg part */}
             <div className='dark:bg-black bg-white dark:text-white w-1/5  h-96 mx-2 rounded-md mt-2  max-w-56 hidden lg:flex border-2 lg:flex-col'>
               <PostButton view={'pc'} setShowSendPost={setShowSendPost}/>
               <video src={vd} className=' h-full'></video>
             </div>
          </div>
      
       
          <div className='relative -top-20 h-32'></div>
          {showSendPost && 
                 <Post setShowSendPost={setShowSendPost}/>
        }
    </>
   
  )
}

export default Home