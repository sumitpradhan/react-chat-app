import React, { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc} from "firebase/firestore";
import { auth,db } from '../lib/firebase'
import uploadFile from '../lib/uploadFile';
import { useDispatch } from 'react-redux';

const LoginComp = () => {


  const [loading,setLoading]=useState(false)
  const [avatar,setAvatar]=useState({
    file:null,
    url:""
  })

  const handleAvatar= e=>{
    console.log(e.target.files[0]);
    if(e.target.files[0])
    {
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
    }
  }

    const handleLogin = async(e) =>{
        e.preventDefault();
        setLoading(true);
        const formData= new FormData(e.target);
        const {email,password}= Object.fromEntries(formData);
        try{

          await signInWithEmailAndPassword(auth,email,password);
          toast.success("Sign in Successfull");
        }
        catch(err)
        {
          toast.error(err.message);
        }
        finally{
          setLoading(false);
        }
    }


    const handleRegister = async (e) =>{
      e.preventDefault();
      setLoading(true);
      const formData= new FormData(e.target);
      const avatarUrl= await uploadFile(avatar.file);
      const {username,email,password}= Object.fromEntries(formData);
      try{
        const resp=await createUserWithEmailAndPassword(auth,email,password);
        //Storing user information in User collection
        await setDoc(doc(db, "users",resp.user.uid), {
          username: username,
          email: email,
          uid: resp.user.uid,
          blocked:[],
          avatar:avatarUrl
        });

        await setDoc(doc(db, "usersChats",resp.user.uid), {
          chat:[]
        }); 

        toast.success("Acount Created Successfully!!!")
      
      }
      catch(err)
      {
        toast.error(err.message);
      }
      finally{
        setLoading(false);
      }
    }

  return (
    <div className="login">

        <div className="item">
            <h2> Welcome Back,</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
                <button disabled={loading}>{loading?"Processing...":"Sign In"}</button>
            </form>
        </div>

        <div className="separator">
      
        </div>

        <div className="item">
            <h2>Create Account</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor='file'> 
                <img src={avatar.url || require('../../Assets/Img/avatar.png') } alt="No Avatar"/>
                Upload an Image</label>
                <input style={{display:"none"}} type="file" id="file" onChange={handleAvatar}/>
                <input type="text" placeholder="Username" name="username"/>
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
                <button disabled={loading}>{loading?"Processing...":"Sign Up"}</button>
            </form>
        </div>
    </div>
  )
}

export default LoginComp
