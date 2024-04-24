import React, { useState } from 'react'
import "./addUser.css"
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../lib/firebase';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddUser = () => {

  const[seachUser,setSearchUser]=useState(null);
  const currentUser= useSelector((store)=>store.user);

  const handleSearch =async (e)=>{
    e.preventDefault();
    const formData=new FormData(e.target);
    const username=formData.get("username");
    try{
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      //console.log(querySnapshot.docs[0].data());
      setSearchUser(querySnapshot.docs[0].data());
    }
    catch(err)
    {
      toast.success(err.message)
    }
  }

    const handleAdd=async()=>{
      const chatRef=collection(db,"chats");
      const userChatRef=collection(db,"usersChats");

      try{
        const newChatRef= doc(chatRef);

        await setDoc(newChatRef,{
          createdAt:serverTimestamp(),
          messages:[]
        });

        await updateDoc(doc(userChatRef,seachUser.uid),{
          chats:arrayUnion({
            chatId:newChatRef.id,
            lastMessage:"",
            receiverId:currentUser.uid,
            updatedAt:Date.now(),
          })
        })

        await updateDoc(doc(userChatRef,currentUser.uid),{
          chats:arrayUnion({
            chatId:newChatRef.id,
            lastMessage:"",
            receiverId:seachUser.uid,
            updatedAt:Date.now()
          })
        })

        toast.success("User Added...")


      }
      catch(err)
      {
        toast.success(err.message)
      }
    }

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder='Username'/>
        <button>Search</button>
      </form>

      {seachUser && <div className="user">
        <div className="detail">
            <img src={seachUser.avatar?seachUser.avatar:require('../../Assets/Img/avatar.png')} alt="avatar" />
            <span>{seachUser.username}</span>    
        </div>

        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
