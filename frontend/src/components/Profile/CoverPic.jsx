import React from 'react'

const CoverPic = ({coverPicture,handleImageChange,editField,setEditField}) => {

  
  return (
     <> 
        
             <img
        src={coverPicture}
        alt="Cover"
        className="w-fit h-fit  object-contain rounded-lg mx-auto"
      />
       
     </>
  )
}

export default CoverPic