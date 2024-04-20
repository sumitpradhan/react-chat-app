import "./chat.css"
import React, { useState,useRef ,useEffect } from 'react'
import EmojiPicker from "emoji-picker-react"

const Chat = () => {
  const [openEmoji,setOpenEmoji] =useState(false);
  const [message,setMessage] =useState("");

  const endRef =useRef(null);//Auto scroll to bottom

  const handleEmojiCick=(e)=>{
    console.log(e.emoji);
    const msg = message;
    setMessage(msg+e.emoji);
  }
  
  useEffect(()=>{
    endRef.current?.scrollIntoView({behaviour:"smooth"});
  },[]);

  return (
    <div className="chat">
      {/* TOP DIV for header*/}
      <div className="top">
        <div className="user">
        <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <span>John Doe</span>
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
        <div className="message">
        <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <p>John Doe</p>
                <span>1 min ago</span>
            </div>
        </div>

        <div className="message own">
            <div className="texts">
            <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
                <p>John Doe</p>
                <span>1 min ago</span>
            </div>
        </div>

        <div className="message">
        <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <p>John Doe</p>
                <span>1 min ago</span>
            </div>
        </div>
        <div className="message">
        <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <p>John Doe</p>
                <span>1 min ago</span>
            </div>
        </div>
        <div className="message own">
            <div className="texts">
            <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
                <p>John Doe</p>
                <span>1 min ago</span>
            </div>
        </div>

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
        value={message}      
        onChange={e=>setMessage(e.target.value)}/>

        <div className="emoji">
          <img src={require('../../Assets/Img/emoji.png')} alt="profile" onClick={()=>setOpenEmoji(!openEmoji)} />
            <div className="picker">
               {openEmoji&&<EmojiPicker onEmojiClick={handleEmojiCick}/>}
            </div>            
        </div>

        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}

export default Chat
