import { createContext, useState } from "react";
import React from 'react'

const Connection = createContext();


export const ConnectionProvide = ({children}) => {

  const [connectionList, setconnectionList] = useState([]);
  const connectionHandler = ()=>{
    
  } 


  return (
    <Connection.Provider value={{connectionList}}>
        {children}
    </Connection.Provider>
  )
}

export default createContext;

