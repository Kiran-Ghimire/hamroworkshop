import axios from "axios";
import { FETCH_USER } from './types';



export const fetchUser = (value) =>  {
    return(({ type: FETCH_USER, payload: value}))
    
};

export const handleToken = (value)  =>  {
    console.log(value);
    return( ({type:FETCH_USER, payload: value}) ) 
   
};

