import React from 'react'
import "./userInfo.css"
import { useSelector } from 'react-redux';
const UserInfo = () => {
  
  const userLoggedIn= useSelector((store)=>store.user);
  return (
    <div className="userInfo">
        <div className="user">
            <img src={userLoggedIn?userLoggedIn.avatar:require('../../../Assets/Img/avatar.png')} alt="profile" />
            <h2>{userLoggedIn.username}</h2>
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