import React, { useEffect, useState } from 'react'
import styles from './ViewPosts.module.scss'
import {toast} from 'react-toastify'
import { db, storage } from '../../firebase/Config';
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { STORE_POSTS, selectPosts } from '../../redux/slice/PostsSlice';
import user from '../../assets/user.png'
import userPic from '../../assets/user.png';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { selectEmail, selectProfilePic, selectUserID, selectUserName } from '../../redux/slice/AuthSlice';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { selectUsers } from '../../redux/slice/UserSlice';


const UserView = ({post}) => {
  const allUsers= useSelector(selectUsers)
const userProfile= useSelector(selectProfilePic)
const userName= useSelector(selectUserName)
const email= useSelector(selectEmail)
const userID= useSelector(selectUserID);
const [count, setCount]= useState(0)
const [commentCount, setCommentCount]= useState(0)
const [loading, setLoading] = useState(true)
const dispatch= useDispatch()
const [likes, setLikes]= useState([])
const [showC, setShowC]= useState(false)
const [liked, setLiked]= useState(false)
const [message, setMessage]= useState('')
const [item, setUserComments]= useState(null)



const handleC=()=> {
  setShowC(!showC)
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

const confirmDelete=(id, image)=> {
    Notiflix.Confirm.show(
      'Delete Post',
      'Do you want to delete this Post ?',
      'Delete',
      'Cancel',
      function okCb() {
        deletePost(id, image)
      },
      function cancelCb() {
       console.log('cancel');
      },
      {
        width: '320px',
        borderRadius: '8px',
        okButtonBackground: '#cc0000',
        titleColor: 'rgb(196, 0, 0)',
        titleFontSize: '20px'
      },
    );
  }

 const deletePost= async (id, image)=> {
    try{
      await deleteDoc(doc(db, "posts", id));
      const storageRef = ref(storage, image);
     await deleteObject(storageRef)
     toast.success('Post Deleted Successfully')
    }catch(error){
      console.log(error.message)
    }
 }



 


async function handleLike(){
  await setDoc(doc(db, 'posts', post.id), {
    ...post,
    likes: [...post.likes, userID]
  })

}

async function handleComment(){
  await setDoc(doc(db, 'posts', post.id), {
    ...post,
    comments: [...post.comments, {userID,userProfile,userName, email, message}]
  })

}


  const handleLoad=()=>{
    setLoading(false)
  }

  return (
   
    
      <>
        
              <div className={styles.mans}>
               <div className={styles.dflex}>
              
               {allUsers.map((user) => {
                if(user.id === post.userID){
                  return (
                    <img className={styles.usu} src={user.userProfilePic !== '' ? user.userProfilePic : userPic} alt="" />
                  )
                }
              })}
               
              {allUsers.map((user) => {
                if(user.id === post.userID){
                  return (
                    <Link to={`/userProfile/${post.userID}`}>
                <p>{user.name}</p>
                </Link>
                  )
                }
              })}
              

               </div>
               <div className={styles.p2}>
               <p> {post.post}</p>
               </div>
               {post.image && loading &&  <Skeleton variant="rounded" animation="wave" style={{marginLeft: '58px', marginTop:'9px', width: '88%', height:'300px' }} />}

              <div className={styles.ImgBlock}>
    <img className={styles.im} src={post.image} onLoad={handleLoad} alt="" />

    </div>
               <div className={styles.ss}>
                <div className={styles.s1}>
                <span className={styles.s2}><AiOutlineHeart size={22} onClick={handleLike} /></span>
               
      {count > 0 && liked &&  <span className={styles.s3}><AiFillHeart size={24} /></span> }
               

                <span className={styles.s5}><BiCommentDetail size={22} onClick={handleC} /></span>

                <span className={styles.s9}><AiOutlineDelete size={23} onClick={()=> confirmDelete(post.id, post.image)} /></span>

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

export default UserView