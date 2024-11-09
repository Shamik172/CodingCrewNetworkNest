import React, { useContext } from 'react'
import JobCard from './jobCard'
import { CreatedJobData } from '../../../Store/LoginUserCreatsJobsDataProvider'

const PastJob = () => {
  
  const {createdJob} = useContext(CreatedJobData);
  console.log("hii",createdJob)

  return (
    <>
        <div className='text-center text-black dark:text-purple-700 md:text-2xl sm:text-xl text-xl fixed top-20 left-10  '>Past Jobs</div>
        <div className='relative flex flex-col items-center  top-36 space-y-4 mx-3 '>
     
          {createdJob.map((it,index)=><JobCard key={index} {...it}/>)}
        </div>
   </>
  
  )
}

export default PastJob