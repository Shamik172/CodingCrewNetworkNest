import React from 'react'


export const NavIcon = ({Icon,IconTitle, url}) => {
  return (
    <div className="group relative flex flex-col items-center">
            <a href={url} className="flex flex-col items-center ">

                {IconTitle==='Notifications' &&<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
                <div>
                {IconTitle === 'Notifications' && <sup className='absolute size-2 bg-red-500 rounded-full left-5'></sup>} 
                <Icon className="hover:text-white"  size={28}/>
                </div>
            
        
            <span className="absolute top-8 px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               {IconTitle}
            </span>
         
            </a>
    </div>
  )
}
