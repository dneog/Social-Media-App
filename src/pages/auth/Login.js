import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './auth.scss';

import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase/Config';
import { ToastContainer, toast } from 'react-toastify';
import ButtonLoader from '../../components/buttonLoader/Loader';
import login from '../../assets/login.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const navigate= useNavigate()
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [isLoading, setLoading]= useState(false);


  const handleLoginGuest=()=> {
   
    setEmail('test@gmail.com')
    setPassword('123456')

   

  }

  const redirectUser=()=> {
   
      navigate('/')
    
  }

  
  const UserLogin=(e)=> {
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   
    const user = userCredential.user;
    setLoading(false)
    toast.success('Login Successful')
   redirectUser()
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false)
    toast.error(errorMessage)

  });

  }

  const signInWithGoogle=()=> {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
   
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
   toast.success('Login Successful')
   redirectUser()
  }).catch((error) => {
    toast.error(error.message)
    
  });
  }




  return (
    <div className='main'>
   
      <div className='login'>
      <img className='sns' src={login} alt="" />
      <p className='lo'>Login</p>
      <form onSubmit={UserLogin}>
      <input type="email" placeholder='Email'  value={email} onChange={(e)=> setEmail(e.target.value)} required/>
      <input type="Password"  placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
     
      
      <button type='submit' className='loginButton'>{isLoading ? <ButtonLoader /> : 'Login'}</button>
        
      </form>
      <p className='ors'>or</p>
      <button className='google' onClick={signInWithGoogle}>
        <FcGoogle className='ic' />&nbsp;
        Login With Google
      </button>
      </div>
      <p className='don'>Don't Have an Account ? 
      <Link to={'/register'}>&nbsp;<span>SignUp</span></Link></p>
      <p className='oro'>or</p>

      <button className='loginButtonss' onClick={()=> handleLoginGuest()}>Login with Test Account</button>
     
    </div>
  )
}

export default Login