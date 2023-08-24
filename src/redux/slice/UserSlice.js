import { createSlice } from '@reduxjs/toolkit'

const initialState = {
profileData: [],
userProfileData: [],
profilePost: [],
profileObj: null,
userProfileObj: null,
updatedName: null,
users: []

}

const UserSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    STORE_PROFILES(state, action){
        state.profileData= action.payload.profiles
    },
    STORE_USER_PROFILES(state, action){
        state.userProfileData= action.payload.userProfile
    },
    STORE_PROFILE_POST(state, action){
        state.profilePost= action.payload.userpost
    }, 
    STORE_PROFILES_OBJ(state, action){
        state.profileObj= action.payload.profileObj
    },
    STORE_USER_PROFILES_OBJ(state, action){
        state.userProfileObj= action.payload.userObj
    },
    STORE_USERS(state, action){
        state.users= action.payload.userArr
    },
    
  }
});

export const {STORE_PROFILES, STORE_PROFILE_POST,STORE_PROFILES_OBJ, STORE_USER_PROFILES, STORE_USER_PROFILES_OBJ,STORE_USERS} = UserSlice.actions

export const selectProfile= (state)=> state.profile.profileData ;
export const selectUserProfile= (state)=> state.profile.userProfileData ;
export const selectProfileObj= (state)=> state.profile.profileObj ;
export const selectUserProfileObj= (state)=> state.profile.userProfileObj ;
export const selectUserPosts= (state)=> state.profile.profilePost ;
export const selectUsers= (state)=> state.profile.users ;

export default UserSlice.reducer