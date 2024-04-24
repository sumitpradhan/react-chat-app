import {useEffect, useState} from 'react'
import "./chatList.css"
import AddUser from '../../addUser/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../lib/firebase';
import { changeChat } from '../../../redux/slices/chatSlice';

const ChatLists = () => {

  const [addMode,setAddMode]=useState(false);
  const [chats,setChats]=useState([]);

    const dispatch=useDispatch()
  const loggedInUser= useSelector((store)=>store.user);

  useEffect(()=>{
        const unsub = onSnapshot(doc(db, "usersChats", loggedInUser.uid), async(resp) => {
                        const items=resp.data().chats;
                        const promises=items.map(async (item)=>{
                            const userRef = doc(db, "users",item.receiverId);
                            const userSnap = await getDoc(userRef);
                            const user=userSnap.data();
                            return{...item,user}
                        }) ; 

                        const chatData = await Promise.all(promises);
                        setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt))

                   }
        );

    return ()=>{
        unsub();
    }
  },[]);
  
const handleChatSelect=(chat)=>{
    console.log(chat);
    dispatch(changeChat(chat))
}

  return (
    <div className="chatList">
        <div className="search">
            <div className="searchBar">
                <img src={require('../../../Assets/Img/search.png')}  alt=""/>
                <input type="text" placeholder='Search...' />
            </div>
            <img className="add"src={addMode ?require('../../../Assets/Img/minus.png'): require('../../../Assets/Img/plus.png')}  alt=""
                onClick={()=>{setAddMode(!addMode)}}/>
        </div>

        {
          chats.map((chat)=>(
            <div className="item" key={chat.chatId} onClick={()=>handleChatSelect(chat)}>
                <img src={chat.user.avatar} alt="profile" />
                <div className="texts">
                    <h2>{chat.username}</h2>
                    <p>{chat.chatId}</p>
                </div>
            </div>
          ))}

        {addMode && <AddUser/>}
    </div>
  )
}

export default ChatLists
