import React from 'react';
import styles from '../friends/Friends.module.scss';
import user from '../../assets/user.png';
import { PiArrowSquareOutBold } from "react-icons/pi";
import { Link, NavLink } from 'react-router-dom';
const ShowNotifications = ({requestBy, profileObj}) => {
  return (
    <div className={styles.t11}>
    <p>Dear {profileObj.name}, You have received a friend request from {requestBy.name}.</p>
    <h4>User Details</h4>
     <div className={styles.t1a}>
   
        <div className={styles.t2}>
        {requestBy.userProfilePic == '' ? (<img src={user} alt="" className={styles.us} />) : (<img src={requestBy.userProfilePic} alt="" className={styles.r33} />)}
        
        <Link to={`/userProfile/${requestBy.id}`}>
        <p>{requestBy.name}</p>
        </Link>
         
        </div>

        <div className={styles.t3}>
        <Link to={`/userProfile/${requestBy.id}`}>
        <PiArrowSquareOutBold size={22} />
        </Link>
        </div>
         
        </div>
    </div>
  )
}

export default ShowNotifications