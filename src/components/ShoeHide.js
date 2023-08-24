import React from 'react'
import { UseSelector, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/slice/AuthSlice';

const ShowHide = ({children}) => {
    const isLoggedIn= useSelector(selectIsLoggedIn)
    if(isLoggedIn){
        return children
    }else{
        return null
    }
  
}
export const ShowLogout = ({children}) => {
    const isLoggedIn= useSelector(selectIsLoggedIn)
    if(!isLoggedIn){
        return children
    }else{
        return null
    }
  
}

export default ShowHide