import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  post: []
}

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    STORE_POSTS(state, action){
      state.post= action.payload.posts
    }
  }
});

export const {STORE_POSTS} = PostsSlice.actions
export const selectPosts= (state)=> state.posts.post
export default PostsSlice.reducer