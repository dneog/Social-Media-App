import React, { useEffect, useState } from 'react'
import Navigation from '../../components/navigation/Navigation'
import styles from './Friends.module.scss';


import { selectUserID } from '../../redux/slice/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import ballon from '../../assets/loading/ballon.gif';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { STORE_FRIENDS, selectFriends } from '../../redux/slice/RequestSlice';
import ShowFriend from './ShowFriend';
import { toast } from 'react-toastify';

const Friends = () => {
  const userID= useSelector(selectUserID)
  const [loading, setLoading] = useState(false)
  const dispatch= useDispatch()
  const friends= useSelector(selectFriends)

  useEffect(()=> {
    getRequests()
  }, [userID])

  const getRequests=()=> {
    setLoading(true)
     try{
   const postRef= collection(db, "friend");
   const qw = query(postRef, orderBy("createdAt", "desc"));
 
  onSnapshot(qw, (snapshot) => {
   const allReq= snapshot.docs.map((doc)=> ({
    
     id: doc.id,
     ...doc.data()
   }))


   const newRequests= allReq.filter((req)=> req.myProfile.id == userID)
  
  
  
 dispatch(STORE_FRIENDS({
   friend: newRequests
 }))
 
   setLoading(false)
 });
 
 
  }catch(error){
   toast.error(error.message)
  setLoading(false)
  }
 
   }



  return (
    <div className='dash eightyFive'>
    <div className='navbar1'>
    <Navigation />
    </div>
   
      <div className='navbar22'>
        <div className={styles.friend}>
          <p>Friends</p>
          <span>{friends.length}</span>
        </div>

        {!userID && loading && <img src={ballon} alt="" className='ballon' /> }
        {friends.length== 0 ? <p className='noRequests'>No Friends Found</p> : friends.map((req)=> (
      <ShowFriend key={req.id} id={req.id} requestBy={req.requestBy} myProfile={req.myProfile}  />))}



        



      </div>

      </div>
  )
}

export default Friends