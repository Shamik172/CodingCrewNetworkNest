import React, {useState, useEffect} from 'react';
import axios from 'axios';


const [savedJobs, setSavedjob] = useState([]);

useEffect(()=>{
    axios.get(`http://localhost:3000/user/getSavedJobs`, {withCredentials: true})
    .then(result=>{
        setSavedjob(result.data);
    })
    .catch(err=>console.log(err));
}, []);


const SaveJob = () =>{
    
}