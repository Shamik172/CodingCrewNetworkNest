import React from 'react'

const LikeCommentShere = ({Icon, title, col, isLogin, ClickHandler}) => {
  return (

        
       <button onClick={ClickHandler} className="flex w-1/3 p-3 justify-center hover:bg-blue-50  dark:hover:bg-slate-900
     ">
          <Icon   className={`hover:${col} hover:scale-150 ${col === 'white'? 'text-slate-400': `text-${col}-400`}`}/>
          {/* <span>{title}</span> */}
        </button>
  )
}

export default LikeCommentShere