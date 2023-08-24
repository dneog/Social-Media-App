import React from 'react'
import styles from './Friends.module.scss';
import user from '../../assets/user.png';
import { PiArrowSquareOutBold } from "react-icons/pi";
import { Link, NavLink } from 'react-router-dom';
const ShowFriend = ({id, requestBy, myProfile}) => {
  return (
    <div className={styles.t1}>
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
  )
}

export default ShowFriend