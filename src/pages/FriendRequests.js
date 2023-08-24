import React from 'react'
import styles from './notification/Notification.module.scss';
import Navigation from '../components/navigation/Navigation';
import { useSelector } from 'react-redux';
import { selectRequests } from '../redux/slice/RequestSlice';
import UserRequest from '../components/request/UserRequest';

const FriendRequests = () => {
    const userNewRequests= useSelector(selectRequests)

  return (
    <div className='dash eightyFive'>
    <div className='navbar1'>
    <Navigation />
    </div>
   
      <div className='navbar22'>
        
        <div className={styles.friend}>
          <p>Notifications</p>
          <span>{userNewRequests.length}</span>
        </div>

        </div>

        <div>
        <div className=''>
      {userNewRequests.length==0 ? <p className='noRequest'>No Friend Requests Found</p> : userNewRequests.map((req)=> (
      <UserRequest key={req.id} _id={req.id} requestBy={req.requestBy} myProfile={req.profileObj}  />)
    )}
      </div>
        </div>


        </div>

  )
}

export default FriendRequests