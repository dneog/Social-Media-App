import React from 'react'
import styles from './MobileRequest.module.scss';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectFilteredProducts} from '../../redux/slice/FilterSlice';
import { selectUserID } from '../../redux/slice/AuthSlice';

const MobileRequest = () => {
  const filteredUsersName= useSelector(selectFilteredProducts)
 const userID= useSelector(selectUserID)
  return (
   
   
      <>
      <div className={styles.results}>
      {filteredUsersName && filteredUsersName.map((user)=> (
        <div className={styles.r1s}>
        <Link to={user.id== userID ? `/profile` :`/userProfile/${user.userID}`}>
        <img src={user.userProfilePic}  className={styles.usersSeach} alt="" /></Link>
        <Link to={user.id== userID ? `/profile` :`/userProfile/${user.userID}`}>
        <p>{user.name}</p>
        </Link>
       
      </div>
      ))}
      
      </div> 
      </>
    


  )
}

export default MobileRequest