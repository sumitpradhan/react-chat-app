import "./chat.css"
import React from 'react'

const Chat = () => {
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
      <div className="bottom"></div>
    </div>
  )
}

export default Chat
