import "./list.css"
import React from 'react'
import UserInfo from "./userInfo/UserInfo"
import ChatLists from "./chatList/ChatLists"

const List = () => {
  return (
    <div className="list">
      <UserInfo/>
      <ChatLists/>
    </div>
  )
}

export default List
