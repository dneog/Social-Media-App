import React, { useRef, useState } from 'react'
import styles from './AddPost.module.scss';
import user from '../../assets/user.png';
import images from '../../assets/image.png';
import video from '../../assets/video.png';
import { db, storage } from '../../firebase/Config';
import {deleteObject, getDownloadURL, ref, uploadBytesResumable, uploadString} from "firebase/storage"
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectEmail, selectProfilePic, selectUserID, selectUserName} from '../../redux/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { SlClose } from "react-icons/sl";
import BarLoader from '../../spinner/BarLoader';


const AddPost = ({onLoadingChange}) => {
  const userID= useSelector(selectUserID)
  const userProfile= useSelector(selectProfilePic)
  const userName= useSelector(selectUserName)
  const email= useSelector(selectEmail)
  const navigate= useNavigate()
  const [loading, setLoading] = useState(false)

  const [image, setImage]= useState(null)
  const [post, setPost]= useState('')

  const addNaviate=()=> {
    navigate('/login')
  }

  const ImageRefHandler= (e)=> {
    const reader= new FileReader()
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload= (readerEvent) => {
      setImage(readerEvent.target.result)
      
    }
  }

  

  const addPostHandler= async (e)=> {
    e.preventDefault()
   setLoading(true)
   onLoadingChange(true)
   const today = new Date();
    const date = today.toDateString();
    const docRef = await addDoc(collection(db, "posts"), {
    post,
    userID,
    userProfile,
    userName,
    email,
    date,
    likes: [],
    comments: [],
    createdAt: Timestamp.now().toDate()

    });

    const imageUrl= ref(storage, `posts/${docRef.id}/image`);

    if(image){
      await uploadString(imageUrl, image, 'data_url').then(async()=> {
        const downloadURL= await getDownloadURL(imageUrl)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL
        })
      })
    }
    
    setPost('')
    setImage(null)
    toast.success('Post Created Successfully')
    setLoading(false)  
    setTimeout(()=> {
      onLoadingChange(false)
    },1000)
   
  }

  return (

    <div className={styles.man}>
     
    <div className={styles.add}>
    {loading && <BarLoader /> }
    {/* {!userID && <img className={styles.usas} src={user} alt="" /> } */}
    {userProfile !== '' ? <img className={styles.userss} src={userProfile} alt="" /> : <img className={styles.usa} src={user} alt="" /> }
    
    <input type="text" name="" id="" placeholder='Write Something' value={post} onChange={(e)=> setPost(e.target.value)}/>
    </div>
    {image &&

    <div className={styles.ImgBlock}>
    <SlClose className={styles.ic} onClick={()=>setImage(null)}/>
    <img className={styles.im} src={image} alt="" />

    </div>
    }
    <div className={styles.three}>

    
    <div className={styles.pd}>

    
    <div className={styles.adds}>
    <label htmlFor="file" >
    <img className={styles.img1} src={images} alt=""  />
      <p>Photo</p>
    </label>
      
      <input className={styles.pick} type="file" name="" id="file"  onChange={ImageRefHandler} />
    </div>

    {/* <div className={styles.adds2}>
      <img className={styles.img1} src={video} alt="" />
      <p>Video</p>
    </div> */}
    </div>
    <div className={styles.adds3}>
      
      <button className={styles.btn } onClick={userID ? addPostHandler : addNaviate}>{loading ? 'Uploading...' : 'Post'}</button>
    </div>


    </div>
    
      
    </div>
  )
}

export default AddPost