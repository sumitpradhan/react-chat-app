import "./chat.css"
import React, { useState,useRef ,useEffect } from 'react'
import EmojiPicker from "emoji-picker-react"
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const Chat = () => {
  const [openEmoji,setOpenEmoji] =useState(false);
  const [text,setText] =useState("");
  const [chat,setChat]=useState(null);
  const endRef =useRef(null);//Auto scroll to bottom
  const userLoggedIn= useSelector((store)=>store.user);
  const userChat= useSelector((store)=>store.chat);

console.log(userChat);

  const handleEmojiCick=(e)=>{
    console.log(e.emoji);
    const msg = text;
    setText(msg+e.emoji);
  }
  
  useEffect(()=>{
    console.log(endRef);
    endRef.current?.scrollIntoView({behaviour:"smooth"});
  },[]);
 
  useEffect(()=>{
    const unSub= onSnapshot(doc(db,"chats",userChat?.chatId),(res)=>{
      setChat(res.data());//getting messages from chat
    })

    return ()=>{
      unSub();
    }
  },[])

  const handleSend=()=>{
  if(text==="") return;
    try{

    }
    catch(err)
    {
      
    }
  }

  return (
    <div className="chat">
      {/* TOP DIV for header*/}
      <div className="top">
        <div className="user">
           <img src={userChat?.user?.avatar?userChat?.user?.avatar:require('../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <span>{userChat?.user?.username}</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="icons">
        <img src={require('../../Assets/Img/phone.png')} alt="profile" />
        <img src={require('../../Assets/Img/video.png')} alt="profile" />
        <img src={require('../../Assets/Img/info.png')} alt="profile" />
        </div>
      </div>

      {/* Center DIV for Chats*/}
      <div className="center">
        {chat?.messages?.map((message)=>(
            <div className="message own" key={message?.createAt}>
            <div className="texts">
            {message?.img && <img src={require('../../Assets/Img/avatar.png')} alt="profile" />}
            <p>{message?.text}</p>
            </div>
        </div>
        ))}      


        <div ref={endRef}>

        </div>

      </div>

      {/* Bottom DIV for sending message*/}
      <div className="bottom">
        <div className="icons">
          <img src={require('../../Assets/Img/img.png')} alt="profile" />
          <img src={require('../../Assets/Img/camera.png')} alt="profile" />
          <img src={require('../../Assets/Img/mic.png')} alt="profile" />
        </div>

        <input type="text" 
        placeholder="Type a message..."
        value={text}      
        onChange={e=>setText(e.target.value)}/>

        <div className="emoji">
          <img src={require('../../Assets/Img/emoji.png')} alt="profile" onClick={()=>setOpenEmoji(!openEmoji)} />
            <div className="picker">
               {openEmoji&&<EmojiPicker onEmojiClick={handleEmojiCick}/>}
            </div>            
        </div>

        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat
