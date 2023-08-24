import React, { useEffect, useState } from 'react'
import Navigation from '../components/navigation/Navigation'
import AddPost from '../components/addPost/AddPost'
import Request from '../components/request/Request'
import ViewPosts from '../components/viewPosts/ViewPosts'
import {toast} from 'react-toastify'
import { db, storage } from '../firebase/Config';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { STORE_POSTS, selectPosts } from '../redux/slice/PostsSlice'
import ballon from '../assets/loading/ballon.gif';
import { selectSessionID, selectUserID } from '../redux/slice/AuthSlice'
import { STORE_PROFILES, STORE_USERS, selectUserProfileObj } from '../redux/slice/UserSlice'
import { STORE_NOTIFICATION, STORE_REQUESTS, selectRequests } from '../redux/slice/RequestSlice'
import UserRequest from '../components/request/UserRequest'
import { selectFilteredProducts } from '../redux/slice/FilterSlice'


const Home = () => {
  const dispatch= useDispatch()
  
  const sessionID= useSelector(selectSessionID)
  const userID= useSelector(selectUserID)
  const userNewRequests= useSelector(selectRequests)
  const ViewPost= useSelector(selectPosts)
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const filteredUsersName= useSelector(selectFilteredProducts)
  const handleLoading=(Load)=> {
    setIsLoading(Load)
  }

  useEffect(()=> {
    getPosts()
    getUsers()
    getRequests()
    getNotification()
  },[userID])


  const getNotification=()=> {
    
     try{
   const postRef= collection(db, "request");
   const qw = query(postRef, orderBy("createdAt", "desc"));
 
  onSnapshot(qw, (snapshot) => {
   const allReq= snapshot.docs.map((doc)=> ({
    
     id: doc.id,
     ...doc.data()
   }))


   const newRequests= allReq.filter((req)=> req.profileObj.id == userID)
  
  
  
 dispatch(STORE_NOTIFICATION({
   notify: newRequests
 }))
 
   
 });
 
 
  }catch(error){
   toast.error(error.message)
 
  }
 
   }






  const getRequests=()=> {
    // setLoading(true)
     try{
   const postRef= collection(db, "request");
   const qw = query(postRef, orderBy("createdAt", "desc"));
 
  onSnapshot(qw, (snapshot) => {
   const allReq= snapshot.docs.map((doc)=> ({
    
     id: doc.id,
     ...doc.data()
   }))

   const newRequests= allReq.filter((req)=> req.profileObj.id == userID)
  
  
  
 dispatch(STORE_REQUESTS({
   req: newRequests
 }))
 
  //  setLoading(false)
 });
 
 
  }catch(error){
   toast.error(error.message)
  // setLoading(false)
  }
 
   }




const getPosts=()=> {
   setLoading(true)
    try{
  const postRef= collection(db, "posts");
  const qw = query(postRef, orderBy("createdAt", "desc"));

 onSnapshot(qw, (snapshot) => {
  const allPosts= snapshot.docs.map((doc)=> ({
   
    id: doc.id,
    ...doc.data()
  }))
 
 
dispatch(STORE_POSTS({
  posts: allPosts
}))

  setLoading(false)
});


 }catch(error){
  toast.error(error.message)
 setLoading(false)
 }

  }
const getUsers=()=> {
   setLoading(true)
    try{
  const postRef= collection(db, "user");
  const qw = query(postRef, orderBy("createdAt", "desc"));

 onSnapshot(qw, (snapshot) => {
  const allUsers= snapshot.docs.map((doc)=> ({
   
    id: doc.id,
    ...doc.data()
  }))
 
 
dispatch(STORE_USERS({
  userArr: allUsers
}))

  setLoading(false)
});


 }catch(error){
  toast.error(error.message)
 setLoading(false)
 }

  }

  
console.log(userNewRequests);


  return (
   
    <div className='dash eightyFive'>
      <div className='navbar1'>
      <Navigation />
      </div>
     

     <div className='navbar2'>
      <AddPost onLoadingChange={handleLoading} />
      {!userID && loading && <img src={ballon} alt="" className='ballon' /> }

      {!isLoading && ViewPost.map((post)=> (
      <ViewPosts key={post.id} post={post} />
      ))}
     </div>

    <div className="navbar3">
      <Request />
      <div className=''>

      {!filteredUsersName && (userNewRequests.length==0 ? <p className='noRequest'>No Friend Requests Found</p> : userNewRequests.map((req)=> (
      <UserRequest key={req.id} _id={req.id} requestBy={req.requestBy} myProfile={req.profileObj}  />)
    ))}
      </div>
  
        
    
     
    </div>

    
      </div>
   
  )
}

export default Home