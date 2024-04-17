import React from 'react'
import "./userInfo.css"
const UserInfo = () => {
  return (
    <div className="userInfo">
        <div className="user">
            <img src={require('../../../Assets/Img/avatar.png')} alt="profile" />
            <h2>John Doe</h2>
        </div>
        <div className="icons">
            <img src={require("../../../Assets/Img/more.png")} alt="more" />
            <img src={require("../../../Assets/Img/video.png")} alt="profile" />
            <img src={require("../../../Assets/Img/edit.png")} alt="profile" />
        </div>
    </div>
  )
}

export default UserInfo