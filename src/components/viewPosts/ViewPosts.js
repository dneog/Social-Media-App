import React, { useEffect, useState } from 'react'
import styles from './ViewPosts.module.scss'
import {toast} from 'react-toastify'
import { db, storage } from '../../firebase/Config';
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { STORE_POSTS, selectPosts } from '../../redux/slice/PostsSlice';
import user from '../../assets/user.png'
import userPic from '../../assets/user.png';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { selectEmail, selectProfilePic, selectUserID, selectUserName } from '../../redux/slice/AuthSlice';
import { selectUsers } from '../../redux/slice/UserSlice';



const ViewPosts = ({post}) => {
const userProfile= useSelector(selectProfilePic)
const userName= useSelector(selectUserName)
const allUsers= useSelector(selectUsers)
const email= useSelector(selectEmail)
const userID= useSelector(selectUserID);
const [count, setCount]= useState(0)
const [commentCount, setCommentCount]= useState(0)
const [loading, setLoading] = useState(true)
const [CirculLoad, setCirculLoading] = useState(true)
const dispatch= useDispatch()
const [likes, setLikes]= useState([])
const [showC, setShowC]= useState(false)
const [liked, setLiked]= useState(false)
const [message, setMessage]= useState('')
const [item, setUserComments]= useState(null)
const navigate= useNavigate()

const handleC=()=> {
  if(userID){
    setShowC(!showC)
  }else{
    navigate('/login')
  }
  
}

 useEffect(()=> {
  if(post.likes){
    post.likes.forEach((item)=>{
    if(item == userID){
      setLiked(true)
    }
    
  }
    )
    setCount(post.likes.length)
    
  }
 }, [post.likes, userID]) 

 

//  useEffect(()=> {
//   if(post.comments){
//     post.comments.map((item)=>{
//    console.log(item);
//       setUserComments(item)
    
    
//   }
//     )
//     setCommentCount(post.comments.length)
    
//   }
//  }, [post.comments]) 


 


async function handleLike(){
  if(userID){
    await setDoc(doc(db, 'posts', post.id), {
      ...post,
      likes: [...post.likes, userID]
    })
  }else{
    navigate('/login')
  }
 

}

async function handleComment(){

  
  await setDoc(doc(db, 'posts', post.id), {
    ...post,
    comments: [...post.comments, {userID,userProfile,userName, email, message}]
  })
  setMessage('')
}


  const handleLoad=()=>{
    setLoading(false)
  }
  const handleCircule=()=>{
    setCirculLoading(false)
  }

  return (
   
    
      <>
        
              <div className={styles.mans}>
               <div className={styles.dflex}>
              
              {allUsers.map((user) => {
                if(user.id === post.userID){
                  return (
                    <>
                   {CirculLoad && 
                    <Skeleton variant="circular" width={37} height={37} style={{position: 'absolute' }} />}
                    <Link to={user.id== userID ? `/profile` :`/userProfile/${post.userID}`}>
                    <img className={styles.usu} onLoad={handleCircule} src={user.userProfilePic !== '' ? user.userProfilePic : userPic} alt="" />
                    </Link>
                    </>
                  )
                }
              })}
             
               
              {allUsers.map((user) => {
                if(user.id === post.userID){
                  return (
                    <Link to={user.id== userID ? `/profile` :`/userProfile/${post.userID}`}>
                <p>{user.name}</p>
                </Link>
                  )
                }
              })}
               
                 
              <div>
                <img src={user} style={{visibility: 'hidden'}} className={styles.usu} alt="" />
              </div>
              

              
               
              

               </div>
               <div className={styles.p2}>
               <p> {post.post}</p>
               </div>
               {post.image && loading &&  <Skeleton className={styles.sk} variant="rounded" animation="wave" style={{marginLeft: '58px', marginTop:'9px', width: '88%', height:'300px' }} />}

              <div className={styles.ImgBlock}>
              
    <img className={styles.im} src={post.image} onLoad={handleLoad} alt="" />

    </div>
               <div className={styles.ss}>
                <div className={styles.s1}>
                <span className={styles.s2}><AiOutlineHeart size={22} onClick={handleLike} /></span>
               
      {count > 0 && liked &&  <span className={styles.s3}><AiFillHeart size={25} /></span> }
               

                <span className={styles.s5}><BiCommentDetail size={22} onClick={handleC} /></span>
                </div>
               <div className={styles.s4}>
                <span>Posted on {post.date}</span>
               </div>
               </div>
               <div className={styles.count}>
                {count > 0 && <span>{count} Likes</span>}
               </div>
              { showC && <div className={styles.cbox}>
                <p className={styles.cn}> Comments </p>

                {post.comments && post.comments.length===0 ? ( <p className={styles.ct}>No Comments yet</p>) : (  post.comments.map((item)=> (
  
                  <>
                
                <div className={styles.os}>
                  <div className={styles.os1}>
                  {item.userProfile !== '' ? <img className={styles.userss} src={item.userProfile} alt="" /> : <img className={styles.usa} src={user} alt="" /> }
                  <p>{item.userName}</p>
                  </div>
                  <div className={styles.os2}>
                    <p>{item.message}</p>
                  </div>
                </div>

                
                </>


                )))}
                

                <div className={styles.ad}>
                {userProfile !== '' ? <img className={styles.userss} src={userProfile} alt="" /> : <img className={styles.usa} src={user} alt="" /> }

                <input type="text" placeholder='Add Comment' value={message} onChange={(e)=> setMessage(e.target.value)} />
                <button className={styles.bx} onClick={handleComment}>Add</button>
                </div>

               </div>}
               </div>
           
       
        </>
    
  
  )
}

export default ViewPosts