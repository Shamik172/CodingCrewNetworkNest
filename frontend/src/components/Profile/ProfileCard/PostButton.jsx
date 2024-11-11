import React, { useState } from 'react'
import { useContext } from 'react';
import CustomerData from '../../../Store/LoginUserDataProvider';
const PostButton =({view, setShowSendPost}) => {
    const {userData,isLogin} = useContext(CustomerData);
   
  
 



     
   
  return (
    <> 
        {isLogin === true ?(
            <div className={`flex  flex-wrap items-center  ${view === 'pc'? 'flex-col  w-full   py-10 ':'flex-row justify-between  h-full '}`}>
                {view !=='pc' && <>
                      <img src="#" alt="pic" className='bg-gray-600 size-16  rounded-full ring-2 ring-offset-2 relative  left-2 my-2'  />
                      <div className='flex flex-col flex-wrap max-w-96 my-2'>
                        <div className='text-center text-xl sm:text-3xl dark:text-orange-600 font-semibold'>{userData.name}</div>
                        <div className="text-center text-sm mt-1 my-2">
                        {userData.bio
                            ? `${userData.bio.slice(0, 25)}${userData.bio.length > 25 ? '...' : ''}`
                            : 'Bio section'}
                        </div>

                     </div>
                </>}
                <div onClick={()=>{setShowSendPost(true)}} className={`${view === 'pc' ? ' ' : 'mr-2'} bg-gray-700 text-white px-7 rounded-lg cursor-pointer py-1 dark:bg-gradient-to-r from-purple-500 to-indigo-500 `}>
                post
               </div>



           </div>
        ):(
           
            <div className={` ${view === 'pc'? 'flex items-center h-40 relative left-1/3': 'flex justify-center items-center h-full'} `}>
               Wellcome 
            </div>
         
        )}
       
 
      

    </>
  )
}

export default PostButton