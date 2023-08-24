import React from 'react'
import styles from './Request.module.scss';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectFilteredProducts} from '../../redux/slice/FilterSlice';
import { selectUserID } from '../../redux/slice/AuthSlice';

const Request = ({userDetails, req}) => {
  const filteredUsersName= useSelector(selectFilteredProducts)
 const userID= useSelector(selectUserID)
  return (
    <>
   { !filteredUsersName ? <div className={styles.req}>

      <div className={styles.r2}>
      <p className={styles.r1}>Friend Requests</p>
      <Link to={'/friendRequests'} >
      <p className={styles.r3}>View All</p>
      </Link>
      </div>

     
       
       

     
      
      
    </div> : (
      <>
      <div className={styles.results}>
      {filteredUsersName && filteredUsersName.map((user)=> (
        <div className={styles.r1s}>
        <Link to={user.id== userID ? `/profile` :`/userProfile/${user.id}`}>
        <img src={user.userProfilePic}  className={styles.usersSeach} alt="" /></Link>
        <Link to={user.id== userID ? `/profile` :`/userProfile/${user.id}`}>
        <p>{user.name}</p>
        </Link>
       
      </div>
      ))}
      
      </div> 
      </>
    )}
</>

  )
}

export default Request