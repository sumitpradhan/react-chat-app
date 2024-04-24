import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addsignInUser:(state,action)=>{
            return action.payload;
        },
        removeSignOutUser:(state)=>{
            return null;
        }
    }
});

export const {addsignInUser,removeSignOutUser} = userSlice.actions;

export default userSlice.reducer;