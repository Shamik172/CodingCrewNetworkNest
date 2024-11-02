import React from 'react'

const LikeCommentShere = ({Icon, title, col}) => {
  return (
    <button className="flex items-center space-x-1 hover:text-gray-900
     ">
          <Icon color={col}/>
          <span>{title}</span>
        </button>
  )
}

export default LikeCommentShere