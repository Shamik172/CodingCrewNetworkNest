
import React, { useState } from 'react'
import { createContext } from 'react'
import Home from '../Home'
const DataProvider = createContext();
const Test = () => {
  const [data,setData]= useState([])
   const  handldata = (newData)=>{
    setData([...data, newData])
   } 


  return (
    <DataProvider.Provider value={{data,handldata}}>
              <div>Test</div>
              {/* <Home/> */}
            
    </DataProvider.Provider>

  )

}

