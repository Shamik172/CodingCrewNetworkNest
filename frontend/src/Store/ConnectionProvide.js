import { createContext, useState } from "react";
import React from 'react'

const ConnectionLocal = createContext();


export const ConnectionProvide = ({children}) => {
                   //you can set UserName
  let ListData = [{id:1  ,name:'Sumanta Sahoo'},{id:2  ,name:'Hemanta Sahoo'}];
  

  //connection list yours
  const [connectionList, setconnectionList] = useState([ListData]);
  const connectionHandler = (newConnection)=>{
    
    
    //set newConnection 
      setconnectionList(currentItem => {
        return [...currentItem,{id:newConnection.id, name:newConnection.name}]
      })
  }
  const disconnectHandler = (oldConnection)=>{
      

    //disConnection
      setconnectionList(currentItem =>{
        return currentItem.filter(item=> item.id !== oldConnection.id);
      })

  }



  //to request list (koi request kya set request list )
  const [request,setRequests] = useState();
  const requestHandler = (newRequest)=>{
       

       //setRequests
       setRequests(panddingRequest =>{

        return [...panddingRequest,newRequest]
       })
  }
  const deleteRequest = (oldRequest)=>{
      

      //deleteRequest
      setRequests(panddingRequest =>{
         return panddingRequest.filter(user=> user.id !== oldRequest.id)
      })
  }

 

  //I accept request 
  const requestAccept = (newUser=>{
         
        //delete a newUser from  my Request list
        deleteRequest(newUser);

        //add my Request list 
        connectionHandler(newUser);


        //to pass refer to myRequestAccept
  })



  //I Reject Request
  const requestReject = (newUser=>{
      

      //delete a newUser from  my Request list
      deleteRequest(newUser);
  })


  






  return (
    <ConnectionLocal.Provider value={{connectionList,connectionHandler}}>
        {children}
    </ConnectionLocal.Provider>
  )
}

export default ConnectionLocal;

