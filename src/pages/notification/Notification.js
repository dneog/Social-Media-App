import React from 'react'
import styles from './Notification.module.scss';
import Navigation from '../../components/navigation/Navigation';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { selectNotification } from '../../redux/slice/RequestSlice';
import ShowNotifications from './ShowNotifications';
const Notification = () => {
  const notification= useSelector(selectNotification)
  console.log(notification);
  return (
    <div className='dash eightyFive'>
    <div className='navbar1'>
    <Navigation />
    </div>
   
      <div className='navbar22'>
        
        <div className={styles.friend}>
          <p>Notifications</p>
          <span>{notification.length}</span>
        </div>

          <div>
          {notification.length==0 ? <p className='noRequests'>No Notification Found</p> : notification.map((notify)=> (
            <ShowNotifications requestBy={notify.requestBy} profileObj= {notify.profileObj}/>
          ))}

          </div>
        
      </div>
      </div>
  )
}

export default Notification