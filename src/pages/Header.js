import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Search from '../components/search/Search'
import user from '../assets/user.png'
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import {onAuthStateChanged, signOut } from "firebase/auth";
import {auth, db} from '../firebase/Config';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectEmail, selectUserID } from '../redux/slice/AuthSlice';
import ShowHide from '../components/ShoeHide';
import { ShowLogout } from '../components/ShoeHide';
import { Button, filledInputClasses } from '@mui/material';
import bell from '../assets/bell.png';
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { STORE_PROFILES, STORE_PROFILES_OBJ, selectProfileObj, selectUsers } from '../redux/slice/UserSlice';
import { selectRequests } from '../redux/slice/RequestSlice';
import { FILTER_SEARCH, selectFilteredProducts } from '../redux/slice/FilterSlice';
import MobileRequest from '../components/request/MobileRequest';

const Header = () => {
  const userID= useSelector(selectUserID)
  const profilePics= useSelector(selectProfileObj)
  const filteredUsersName= useSelector(selectFilteredProducts)
  const [show, setShow]= useState(false)
  const userNewRequests= useSelector(selectRequests)
  
  const allUsers= useSelector(selectUsers)
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const [userName, setUserName]= useState('');
const [userMail, setUserMail]= useState('');
const [userPofilePic, setUserProfilePic]= useState('');
const [search, setSearch]= useState('')
const [document, setDocument]= useState(null)



useEffect(()=> {
  dispatch(FILTER_SEARCH({
    allUsers,
    search
  }))
}, [dispatch, allUsers, search])


  const handleClick=()=> {
    setShow(!show)
  }
  const handleRoute=()=> {
    navigate('/')
  }
  const handleNav=()=> {
    navigate('/login')
  }

  useEffect(()=> {
    getProfile()
    onAuthStateChanged(auth,  (user) => {
      if (user) {
        const ID= user.email
        const uniqueID= user.uid
        setUserProfilePic(user.photoURL)
        

        try{
          const postRef= collection(db, "user");
          
        
         onSnapshot(postRef, (snapshot) => {
          const allPosts= snapshot.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data()
          }))
         const requiredUser= allPosts.filter((item)=> item.email === ID)
         
         requiredUser.map((user)=> (
         
          dispatch(SET_ACTIVE_USER(
            {
              email: user.email,
              userName: user.name,
              userID: user.id,
              profilePic: user.userProfilePic,
              sessionID: uniqueID,
              
            }
          ))
         ))
        });
        
        
         }catch(error){
          toast.error(error.message)
         
         }


        
        

        setUserName(user.displayName)
        setUserMail(user.email)
      
  
        
      } else {
        // setUserName('')
        // setUserMail('')
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  },[dispatch,userID])

  const getProfile = async ()=> {
    
     try{
   const postRef= collection(db, "user" );
   const snapshot= await getDocs(postRef)
 
  
   const allPosts=  snapshot.docs.map((doc)=> ({
    
     id: doc.id,
     ...doc.data()
   }))
  const newData= allPosts.filter((item)=> item.id == userID)
   // setProfileData(newData)
 
   dispatch(STORE_PROFILES({
     profiles: newData
     }))
 
 
 newData.map((data)=> (
   dispatch(STORE_PROFILES_OBJ({
     profileObj: data
     }))
 )
 
 )
   
 
 
   
 
 
 
  }catch(error){
   toast.error(error.message)
  
  }
 
   }

   
  
  
  
  const logout=()=> {
    
  signOut(auth).then(() => {
   toast.success('LogOut Successful');
   navigate('/login')
   setSearch('')
   setShow(!show)
  }).catch((error) => {
    toast.error(error)
  });
}

const handleSearchClose=()=> {
  setSearch('')
}


  return (
    <div className={styles.mains}>
    <div className={styles.fl}>
      <div>
        <p className={styles.social} onClick={handleRoute}>Social</p>
      </div>

      
       
     

      <div className={styles.md}>
      <div className={styles.lefts}>
      <Search value={search} onChange={(e)=> setSearch(e.target.value)} />

      </div>
      {filteredUsersName &&  <div className={styles.mphone}>
      <MobileRequest />
      </div> }
     
     
     
     

      <NavLink to={'/notification'}>
      <img className={styles.bell} src={bell} alt="" />
      <span className={styles.bell1}>{userNewRequests.length}</span>
      </NavLink>

      {profilePics ? (!userID || profilePics.userProfilePic == '' ? <img className={styles.user} src={user} alt="" onClick={handleClick} /> : <img className={styles.user} src={profilePics.userProfilePic} alt="" onClick={handleClick} />) : ( <img className={styles.user} src={user} alt="" onClick={handleClick} />) }
      
      {/* {userID && <button className='--btnt' onClick={handleNav}>Login</button>} */}

        
      </div>

    </div>
    {show && <div className={styles.profile}>
      <ul>
      <NavLink to={userID ? '/profile' : '/login'}>
      <li onClick={handleClick}> Profile</li>
      </NavLink>
        
        <ShowHide>
        <li onClick={logout}> Logout</li>
        </ShowHide>

        <ShowLogout>
        <NavLink to={'/login'} >
        <li onClick={handleClick}>Login</li>
        </NavLink>
         
        </ShowLogout>
        
      </ul>
    </div>}
    
    </div>
  )
}

export default Header