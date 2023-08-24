import React, { useState } from 'react'
import styles from './Request.module.scss';
import user from '../../assets/user.png';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUserProfileObj } from '../../redux/slice/UserSlice';
import { selectUserID } from '../../redux/slice/AuthSlice';
import InsideAccept from '../../spinner/InsideAccept';


const UserRequest = ({_id, requestBy, myProfile}) => {
  const profileObj= useSelector(selectUserProfileObj)
  const [loading, setLoading]= useState(false)

 const [edit, setEdit]= useState(false)

  const handleAccept = async (e)=> {
    e.preventDefault()
    setLoading(true)
    setEdit(!edit)
  
     const docRef = await addDoc(collection(db, "friend"), {
      myProfile,
     requestBy,
     createdAt: Timestamp.now().toDate()
  
     });
    
     deletePost(_id)

     const newDocRef = await addDoc(collection(db, "friend"), {
     myProfile: requestBy,
     requestBy : myProfile,

     createdAt: Timestamp.now().toDate()
     
  
     });
     const {banner, createdAt, email, id, mainID, name, userProfilePic}= requestBy
     const docData= doc(db, 'user', id)
     const getUserSnap= await getDoc(docData)
     const currentData= getUserSnap.data()
     const updateFriendID= [myProfile.id, ...currentData.friendID]
     await updateDoc(docData, {
      banner, createdAt, email, id, mainID, name, userProfilePic,
      friendID: updateFriendID
     })


     
     const docDataP= doc(db, 'user', myProfile.id)
     const getUserSnapp= await getDoc(docDataP)
     const currentDatas= getUserSnapp.data()
     const updateFriendIDs= [requestBy.id, ...currentDatas.friendID]
     await updateDoc(docDataP, {

      banner:myProfile.banner , createdAt:myProfile.createdAt, email:myProfile.email, id:myProfile.id, mainID:myProfile.mainID, name:myProfile.name, userProfilePic:myProfile.userProfilePic,
      friendID: updateFriendIDs
     })
     toast.success('Request Accepted')
     setLoading(false)
    
     

  }



  const deletePost= async (_id)=> {
    try{
      await deleteDoc(doc(db, "request", _id));

    }catch(error){
      toast.error(error.message)
    }
 }
  return (

    <>

     
    <div className={styles.rr}>

<div className={styles.r5}>
{requestBy.userProfilePic == '' ? (<img src={user} alt="" className={styles.r4} />) : (<img src={requestBy.userProfilePic} alt="" className={styles.r44} />)}

<p>{requestBy.name}</p>
</div>

<div className={styles.r6}>
  <button className={styles.r7} onClick={handleAccept}>{loading ? <InsideAccept /> : 'Accept'}</button>
  <button className={styles.r8} onClick={()=> deletePost(_id)}>Reject</button>
</div>
</div>
    

</>
  )
}

export default UserRequest