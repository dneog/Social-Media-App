import authReducer from "./slice/AuthSlice";
import postsReducer from "./slice/PostsSlice";
import UserReducer from "./slice/UserSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import RequestReducer from "./slice/RequestSlice";
import FilterReducer from "./slice/FilterSlice";

const rootReducers= combineReducers({
    auth: authReducer,
    posts: postsReducer,
    profile: UserReducer,
    request: RequestReducer,
    filter: FilterReducer
})

const store= configureStore({
    reducer: rootReducers
})

export default store
