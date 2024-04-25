import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chatId:null,
        user:null,
        isCurrentUserBlocked:false,
        isRecieverBlocked:false
    },
    reducers:{
        changeChat:(state,action)=>{
            console.log(action.payload);
            const  {chatId,user,receiverId} = action.payload;
            state.chatId=chatId;
            state.user=user;

        },
        removeChat:(state)=>{
            state.chatId=null;
            state.user=null;
            state.isCurrentUserBlocked=false;
            state.isRecieverBlocked=false;
        }
    }

})

export const {changeChat,removeChat} = chatSlice.actions;
export default chatSlice.reducer;