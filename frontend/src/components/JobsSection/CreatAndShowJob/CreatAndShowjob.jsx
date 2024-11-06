import React, { useState } from 'react'
import JobPostingForm from './JobPostingForm'
import JobCard from './jobCard';





const CreatAndShowjob = () => {
  
  const [Store, setStore] = useState([]);
  const [toggleButton, setToggleButton] = useState(true);
  

  console.log(Array.isArray(Store))
  const handlerStoreData = (jobData)=>{
     console.log(jobData);
     setStore([...Store,jobData]);
  }

  return (
    <>

    <div className='fixed md:text-2xl sm:text-xl text-sm text-center   left-1/2  -translate-x-1/2 translate-y-2 z-10 grid grid-cols-2 shadow-md border-2 border-sky-500 shadow-sky-500 rounded-full'>
      <button className={` px-4 py-1 rounded-l-full ${toggleButton ? 'bg-sky-400' : 'bg-white'}`} onClick={()=>setToggleButton(true)}>Creat Job+</button>
      <button className={` px-4 py-1 rounded-r-full ${!toggleButton ? 'bg-sky-400' : 'bg-white'}`} onClick={()=>setToggleButton(false)}> Past Job</button>
    </div>
  
    {toggleButton ? ( <div className='relative top-10'>
       <JobPostingForm returnData={handlerStoreData}/>
      
    </div>)
     :(<div className='fixed top-8 left-28 text-purple-600'>
     {Store.reverse().map((it,index)=><JobCard key={index} {...it}/>)}
    </div>)}
    </>
    
  )
}

export default CreatAndShowjob