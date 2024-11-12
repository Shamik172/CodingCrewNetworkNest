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
import InfiniteScroll from 'react-infinite-scroll-component';



const Home = () => {
  

   const {userData,userHandler,isLogin, handlerLogin} = useContext(CustomerData);
   const [showSendPost, setShowSendPost] = useState(false);


  
  // (this my main code)

  //++++++++++++++++++++++++++++++++++++++++++++++++++++
/*  const [allPosts, setAllPosts] = useState([{}]);


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
    }, [allPosts]);*/
  //++++++++++++++++++++++++++++++++++++++++++++++


  //----------------------------------------------------
   
 
  const [allPosts, setAllPosts] = useState([]); // Stores all loaded posts
  const [pageParam, setPageParam] = useState(1); // Page counter
  const [hasMore, setHasMore] = useState(true); // Indicates if more posts are available
  const limit = 2; // Number of posts per page

  // Function to fetch posts based on the current page
  const fetchPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/post/getAllPosts', {
            params: { page: pageParam, limit }
        });
        const newPosts = response.data;
        console.log('Fetched Posts:', newPosts); // Debugging output

        console.log('Page:', pageParam, 'Data received:', newPosts);
 
        if (newPosts.length < limit) {
            setHasMore(false);
        }
 
        setAllPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPageParam(prevPage => prevPage + 1);
    } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
    } finally {
      setIsFetching(false); // Reset fetching flag
    }
 };
 

  // Initial load
  useEffect(() => {
    fetchPosts();
  }, []); 

  //----------------------------------------------------
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


             <div className='md:w-3/4 w-full md:mx-0  mx-1  max-w-2xl flex flex-col items-center  '>
             


                    {/* below lg part */}
                  <div className='dark:bg-slate-900 bg-slate-200 dark:text-white  w-full mx-2 rounded-md mt-2 lg:hidden   mb-2 py-3'>
                  
                  <PostButton view={'mobile'} setShowSendPost={setShowSendPost}/>
                  </div>



                  <InfiniteScroll
                     className='h-screen'
                      dataLength={allPosts.length} // This is the length of the data loaded so far
                      next={fetchPosts} // Function to load more posts
                      hasMore={hasMore} // Continue loading until `hasMore` is false
                      loader={<h4>Loading more posts...</h4>} // Loading indicator
                      endMessage={<p>No more posts to show.</p>} // Message when all posts are loaded
    >
                  {allPosts.map((item,index) =>  <UserPost key={index} UserProfile={item} isLogin={isLogin}/>)}
                  </InfiniteScroll>

          {/* -------------------------------------------------------- */}
                  {/* {isLoading && <p>Loading more posts...</p>} */}
          {/* --------------------------------------------------------- */}

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