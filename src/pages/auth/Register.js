import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './auth.scss';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../../firebase/Config';
import ButtonLoader from '../../components/buttonLoader/Loader';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import signup from '../../assets/signup.png';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

const Register = () => {
  const navigate= useNavigate()
  const [email, setEmail]= useState('');
  const [userID, setUserID]= useState('')
  const [name, setName]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [isLoading, setLoading]= useState(false);

  const redirectUser=()=> {
    navigate('/')
}

const storeUserData= async (id)=> {
  const docRef = await addDoc(collection(db, "user"), {
    
    mainID:id,
    name,
    email,
    userProfilePic: '',
    banner: '',
    friendID: [],
    createdAt: Timestamp.now().toDate()

    });
 
}
const storeGUserData= async (id, name, email, userProfilePic)=> {
  const docRef = await addDoc(collection(db, "user"), {
    
    mainID:id,
    name,
    email,
    userProfilePic,
    banner: '',
    friendID: [],
    createdAt: Timestamp.now().toDate()

    });
 
}




  const registerUser= async (e)=> {
    e.preventDefault();
    
    setLoading(true)


    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   
    const user = userCredential.user;
    const id= user.uid
    
    
      storeUserData(id)
    
   
   setLoading(false);
   
   navigate('/login')
   toast.success('Account Created Successfully')


  })
  .catch((error) => {
    toast.error(error.message);
    setLoading(false)
  });

  }

  const signInWithGoogle=()=> {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
   
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const Guser = result.user;
    setName(Guser.displayName)
    setUserID(Guser.uid)
    setEmail(Guser.email)
    storeGUserData(Guser.uid,Guser.displayName,Guser.email,Guser.photoURL)
   toast.success('Account Created Successfully')
   redirectUser()
  }).catch((error) => {
    toast.error(error.message)
    
  });
  }
  return (

    <div className='main'>
    
      <div className='login'>
      <img className='sns' src={signup} alt="" />
      <p className='lo'>SignUp</p>

      <form onSubmit={registerUser}>
      <input type="text"  placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} required/>
      <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
      <input type="Password"  placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
   
     
      <button className='loginButton' type='submit'>{isLoading ? <ButtonLoader /> : 'SignUp'}</button>
      </form>
      <p className='ors'>or</p>
      <button className='google' onClick={signInWithGoogle}>
        <FcGoogle className='ic' />&nbsp;
        Signup With Google
      </button>
     
      </div>
      <p className='don'>Already Have an Account ? 
      <Link to={'/login'}>&nbsp;<span>Login</span></Link></p>
    </div>
   
  )
}

export default Register