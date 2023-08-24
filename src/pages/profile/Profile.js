import React, { useEffect, useState } from 'react'
import styles from './Profile.module.scss'
import Navigation from '../../components/navigation/Navigation';
import banner from '../../assets/banner.jpg';
import profileMain from '../../assets/profileMain.png';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/Config';
import {toast} from 'react-toastify';
import Loading from '../../spinner/Loading'
import {  useDispatch, useSelector } from 'react-redux';
import { selectSessionID, selectUserID } from '../../redux/slice/AuthSlice';
import { SET_CALL, STORE_PROFILES, STORE_PROFILES_OBJ, STORE_PROFILE_POST, selectProfile, selectProfileObj, selectUserPosts } from '../../redux/slice/UserSlice';
import { BsFillCameraFill } from "react-icons/bs";
import UserView from '../../components/viewPosts/UserView';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import ProfileLoader from '../../spinner/ProfileLoader';
import { BiEdit } from "react-icons/bi";
import { selectFriends } from '../../redux/slice/RequestSlice';
import ShowFriend from '../friends/ShowFriend';


const Profile = () => {

  const {id}= useParams()
  const navigate= useNavigate()
  const profileData= useSelector(selectProfile)
  const userPosts= useSelector(selectUserPosts)
  const profileObj= useSelector(selectProfileObj)
  const sessionID= useSelector(selectSessionID)
  const dispatch = useDispatch()
  const userID = useSelector(selectUserID)
  const friends= useSelector(selectFriends)
  const [isLoading, setIsLoading]= useState(false);
  const [loading, setLoading]= useState(false)
  const [showCam, setShowCam]= useState(false)
  const [clicked, setClicked]= useState(true)
  const [clicked1, setClicked1]= useState(false)
  const [clicked2, setClicked2]= useState(false)

  // const [profileData, setProfileData]= useState([])
  const [edit, setEdit]= useState(false)
  const [postID, setPostID]= useState(null)
  const [profileImage, setProfileImage]= useState(null)
  const [name, setName]= useState('')
  
  
  useEffect(()=> {
    getProfile()
    
   },[userID, dispatch])

  // use 'edit' in useEffect for realtime update
   
   useEffect(()=> {
    if(profileData.length > 0){
     getPosts()
    }
   },[profileData])

  const getProfile = async ()=> {
   setLoading(true)
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
  


  setLoading(false)



 }catch(error){
  toast.error(error.message)
 setLoading(false)
 }

  }




  const getPosts=()=> {
    setLoading(true)
     try{
   const postRef= collection(db, "posts");
   
 
  onSnapshot(postRef, (snapshot) => {
   const allPosts= snapshot.docs.map((doc)=> ({
    
     id: doc.id,
     ...doc.data()
   }))


  const newPost= allPosts.filter((item)=> 
  profileData.some((profile )=> profile.id == item.userID)
  )

  dispatch(STORE_PROFILE_POST({
    userpost: newPost
  }))
  
 
   setLoading(false)
 });
 
 
  }catch(error){
   toast.error(error.message)
  setLoading(false)
  }
 
   }


   const handleName= async ()=> {
    
      await setDoc(doc(db, 'user', userID), {
        ...profileObj,
        name: name
      })
    toast.success('Name Changed Successfully')
     
     navigate('/')
    
   }



 

  const handleImage=(e)=> {
    setShowCam(!showCam)
    const imagefile= e.target.files[0]
    const reader= new FileReader()
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload= (readerEvent) => {
      setProfileImage(readerEvent.target.result)
      
    }
    setIsLoading(true)

    const storageRef = ref(storage, `images/${Date.now()}${imagefile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imagefile);

    uploadTask.on('state_changed', 
  (snapshot) => {
    
    
   
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
   toast.error(error.message)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateDoc(doc(db, 'user', userID), {
        ...profileObj,
         userProfilePic: downloadURL
       })
       toast.success('Profile Updated Successfully')
       setIsLoading(false)  
    });
  }
    )
   
  }

  

  const showCamera=()=> {
    setShowCam(!showCam)
    
  }

  const handleEdit=()=> {
    setEdit(!edit)
  }

  const handleMedia=()=> {
    setClicked(true)
    setClicked1(false)
    setClicked2(false)
  }
  const handlePosts=()=> {
    setClicked(false)
    setClicked1(true)
    setClicked2(false)
  }
  const handleFriend=()=> {
    setClicked(false)
    setClicked1(false)
    setClicked2(true)
  }
 
  return (
    <>
    <div className='dash eightyFive'>
      <div className='navbar1'>
      <Navigation />
      </div>
      {loading ? <Loading /> : (
        <div className='navbar22'>
        
        {profileData.map((data)=> (
          <>
          <div className={styles.banner}>

          {/* {showCam && 
          <>
          <label htmlFor="file"> <BsFillCameraFill className={styles.cambanner} /></label>
         
          <input type="file" id='file' />
          </>
         
          } */}
      {data.banner !== '' ? (<img src={data.banner} alt="" />) : (<img src={banner} alt="" />) }

      
      
    </div>

    <div className={styles.pc3}>

    <div className={showCam ? `${styles.pc11}` : `${styles.pc1}`}>
    {showCam &&
      <>
          <label htmlFor="files"> <BsFillCameraFill className={styles.cam} /> </label>
         
          <input className={styles.photoInp} onChange={handleImage} type="file" id="files" />
          </>
     }
     {isLoading && <ProfileLoader />}
     {profileImage ?( <img className={styles.pc8} src={profileImage} alt="" />) :   
    (data.userProfilePic !== '' ? <img className={styles.pc8} src={data.userProfilePic} alt="" /> : <img className={styles.pc2} src={profileMain} alt="" />) }
    
    </div>
    <div className={styles.pc4}>
      <div className={styles.pps}>
      <p className={styles.pc6}>{data.name}</p>
      {showCam && <BiEdit size={25} style={{cursor:'pointer'}} onClick={handleEdit} className={styles.bii}/>}
      </div>
      {edit &&  <div className={styles.ip1}>
      <input type="text" name="" id="" placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)}  />
      <button className={styles.ip2} onClick={handleName} >Update</button>
      </div>}
     
     
      <p className={styles.pc5}>{data.email}</p>
     
      <button style={{cursor: 'pointer'}} className={styles.pc7} onClick={showCamera}>{isLoading ? 'Uploading..' :'Edit Profile'}</button>
    </div>
    
      
    
    </div>

          </>
        ))}
      
      
        <div className={styles.d1}>
        <button className={clicked ? `${styles.c1}` : `${styles.c2}`} onClick={handleMedia}>Media</button>
        <button className={clicked1 ? `${styles.c1}` : `${styles.c2}`} onClick={handlePosts}>Posts</button>
        <button className={clicked2 ? `${styles.c1}` : `${styles.c2}`} onClick={handleFriend}>Friends</button>
        
      </div>

     {/* Media */}
     {clicked && <div className={styles.m1}>

{userPosts.map((imgs)=> (
  <div className={styles.m2}>
  {imgs.image == '' ? <p>No Photos or videos found</p> : <img className={styles.pc2} src={imgs.image} alt="" /> }
      
    </div>
))}
    
</div> }

  {/* Posts */}
  {clicked1 && <div className={styles.pp}>
  {userPosts.map((post)=> (
    <UserView key={post.id} post={post} />
  )
  )}
    
  </div>}
  
  {clicked2 && (friends.length== 0 ? <p className='noRequests'>No Friends Found</p> : friends.map((req)=> (
      <ShowFriend key={req.id} id={req.id} requestBy={req.requestBy} myProfile={req.myProfile}  />)))
      
      }
      
    
     
     </div>
      )}

      
      
    
      </div>

      

      </>
  )
}

export default Profile