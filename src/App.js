import { Flip, ToastContainer } from 'react-toastify';
import './App.scss';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Profile from './pages/profile/Profile';
import Navigation from './components/navigation/Navigation';
import Notification from './pages/notification/Notification';
import Friends from './pages/friends/Friends';
import UserProfile from './pages/userProfile/UserProfile';
import FriendRequests from './pages/FriendRequests';
function App() {
  return (
    <div className="App">
    <ToastContainer transition={Flip} position='bottom-right'/>
    <Header />
     <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/friendRequests' element={<FriendRequests />}/>
     <Route path='/' element={<Home />}/>
     <Route path='/friends' element={<Friends />}/>
     <Route path='/profile' element={<Profile />}/>
     <Route path='/userProfile/:id' element={<UserProfile />}/>
      <Route path='/notification' element={<Notification />}/>
      </Routes>
     </div>
      
     
     
  
  );
}

export default App;
