import React from 'react'
import TextToggle from './TextToggle'

const ContentSection = ({img,desc}) => {
  return (
    <>
      <TextToggle desc={desc}/>
      <div className="my-3 flex justify-center items-center  dark:bg-black text-gray-600 text-center  ">
         <img src={img} alt=""  className='bg-center bg-cover bg-no-repeat max-h-80 rounded-md ring-2 ring-slate-500 dark:ring-sky-900 '/>
          
        </div>
    </>
   
  )
}

export default ContentSection