import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    requests: [],
    friends: [],
    notification: []
}

const RequestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    STORE_REQUESTS(state, action){
        state.requests= action.payload.req
    },
    STORE_FRIENDS(state, action){
        state.friends= action.payload.friend
    },
    STORE_NOTIFICATION(state, action){
        state.notification= action.payload.notify
    },
  }
});

export const {STORE_REQUESTS, STORE_FRIENDS, STORE_NOTIFICATION} = RequestSlice.actions

export const selectRequests= (state)=> state.request.requests
export const selectFriends= (state)=> state.request.friends
export const selectNotification= (state)=> state.request.notification
export default RequestSlice.reducer