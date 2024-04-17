import "./chat.css"
import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"

const Chat = () => {
  const [openEmoji,setOpenEmoji] =useState(false);
  return (
    <div className="chat">
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
      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          <img src={require('../../Assets/Img/img.png')} alt="profile" />
          <img src={require('../../Assets/Img/camera.png')} alt="profile" />
          <img src={require('../../Assets/Img/mic.png')} alt="profile" />
        </div>

        <input type="text" placeholder="Type a message.." />
        <div className="emoji">
          <img src={require('../../Assets/Img/emoji.png')} alt="profile" onClick={()=>setOpenEmoji(!openEmoji)} />
            {openEmoji&&<EmojiPicker/>}
        </div>

        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}

export default Chat
