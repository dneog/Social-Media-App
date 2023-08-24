import React from 'react'
import './Navigation.scss';
import { NavLink } from 'react-router-dom';
import Home from '../../assets/home.png';
import profile from '../../assets/profile.png';
import notification from '../../assets/notification.png';
import friend from '../../assets/friend.png';
import { UseSelector, useSelector } from 'react-redux';
import { selectUserID } from '../../redux/slice/AuthSlice';
const Navigation = () => {
  const userID = useSelector(selectUserID)
    const activeClass= ({isActive})=> (isActive ? 'active sn ': 'sn')
  return (
    
    <div className='navi'>
        <NavLink to={'/'} className={activeClass}>
        <img className='hns' src={Home} alt="" />
        <p>Home</p>
        </NavLink>
        <NavLink to={userID ? `/profile` : `/login`} className={activeClass}>
        <img className='hn' src={profile} alt="" />
        <p>Profile</p>
        </NavLink>
        <NavLink to={userID ? '/notification' : '/login'} className={activeClass}>
        <img className='hn' src={notification} alt="" />
        <p>Notifications</p>
        </NavLink>
        <NavLink to={userID ? '/friends' : '/login'} className={activeClass}>
        <img className='hn' src={friend} alt="" />
        <p>Friends</p>
        </NavLink>
    </div>
   
  )
}

export default Navigation