import "./chat.css"
import React, { useState,useRef ,useEffect } from 'react'
import EmojiPicker from "emoji-picker-react"
import { useSelector } from 'react-redux';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import uploadFile from "../lib/uploadFile";

const Chat = () => {
  const [openEmoji,setOpenEmoji] =useState(false);
  const [text,setText] =useState("");
  const [chat,setChat]=useState(null);
  const endRef =useRef(null);//Auto scroll to bottom
  const userLoggedIn= useSelector((store)=>store.user);
  const userChat= useSelector((store)=>store.chat);

  const [img,setImg]=useState({
    file:null,
    url:""
  })

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
  },[userChat?.chatId]);

  const handleSend= async()=>{
      if(text==="") return;

      let imgUrl=null;
      try
      {
        if(img.file)
        {
          imgUrl=await uploadFile(img.file);
        }
        await updateDoc(doc(db,"chats",userChat?.chatId),{
          messages:arrayUnion({
            senderId:userLoggedIn.uid,
            text,
            createdAt:new Date(),
            ...(imgUrl && {img:imgUrl}),
          }),
        });

        const userIDs=[userLoggedIn.uid,userChat?.user.uid]
        
        userIDs.forEach(async(id)=>{
          const userChatsRef= doc(db,"usersChats",id);
          const userChatsSnapshot= await getDoc(userChatsRef)
  
          if(userChatsSnapshot.exists())
          {
            const userChatsData=userChatsSnapshot.data();
            const chatIndex = userChatsData.chats.findIndex((c)=>c.chatId===userChat?.chatId);
            userChatsData.chats[chatIndex].lastMessage=text;
            userChatsData.chats[chatIndex].isSeen=id===userLoggedIn.uid?true:false;
            userChatsData.chats[chatIndex].updatedAt=Date.now();
  
            await updateDoc(userChatsRef,{
              chats:userChatsData.chats
            });
          }
        })


      }
      catch(err)
      {
        
      }
      setImg({
        file:null,
        url:""
      })

      setText("")
  }

  const handleImage= e=>{
    console.log(e.target.files[0]);
    if(e.target.files[0])
    {
      setImg({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
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
            <div className={userLoggedIn.uid===message.senderId?"message own":"message"} key={message?.createAt}>
            <div className="texts">
            {message?.img && <img src={message?.img} alt="profile" />}
            <p>{message?.text}</p>
            </div>
        </div>
        ))}      

        { img.url && 
          <div className="message own">
            <div className="texts">
            <img src={img.url} alt="profile" />
            </div>
          </div>
        }

        <div ref={endRef}>

        </div>

      </div>

      {/* Bottom DIV for sending message*/}
      <div className="bottom">
        <div className="icons">
        <label htmlFor='file'> 
        <img src={require('../../Assets/Img/img.png')} alt="profile" /></label>
        <input style={{display:"none"}} type="file" id="file" onChange={handleImage}/>
         
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
