import React from 'react'

const CoverPic = ({coverPicture,handleImageChange,editField,setEditField}) => {

  
  return (
     <> 
        
         <img
          src={coverPicture}
          alt="Cover"
          className="w-full h-56 object-cover rounded-lg"
        />
       
     </>
  )
}

export default CoverPic