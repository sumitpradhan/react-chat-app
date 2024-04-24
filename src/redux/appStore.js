import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
//configuring store
const appstore=configureStore({
    reducer:{
        user:userReducer,//added userreducer
        chat:chatReducer
    }
});

export default appstore;