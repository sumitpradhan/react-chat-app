import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
//configuring store
const appstore=configureStore({
    reducer:{
        user:userReducer//added userreducer
    }
});

export default appstore;