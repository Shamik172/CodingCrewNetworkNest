import React from 'react'
import TextToggle from './TextToggle'

const ContentSection = ({img,desc}) => {
  return (
    <>
      <TextToggle desc={desc}/>
      <div className="flex justify-center items-center  bg-black text-gray-600 text-center">
         <img src={img} alt=""  className='bg-center bg-cover bg-no-repeat max-h-80 '/>
          
        </div>
    </>
   
  )
}

export default ContentSection