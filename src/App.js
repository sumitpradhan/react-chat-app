import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import LoginComp from "./components/login/LoginComp";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./components/lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { addsignInUser, removeSignOutUser } from "./redux/slices/userSlice";
import { removeChat } from "./redux/slices/chatSlice";

function App() {
  
  const dispatch=useDispatch();
  const userLoggedIn= useSelector((store)=>store.user);
  const userChat= useSelector((store)=>store.chat);
  useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth, async (user) => {
      if (user) 
      {
          const docRef = doc(db, "users",user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const {username,email,avatar,blocked}=docSnap.data();
            dispatch(addsignInUser({
              username: username,
              email: email,
              uid: user.uid,
              blocked:blocked,
              avatar:avatar
            }));

          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
      } 
      else 
      {
        dispatch(removeSignOutUser());
        dispatch(removeChat())
      }
    });
    
    return()=>{
      unsubscribe();// Unsubscribe will be called when component unmounts. or unsubscribed to onAuthStateChanged callback.
    };

  },[]);

  return (
    <div className="container">
      {
         userLoggedIn?(<>
            <List/>
            {userChat.chatId &&<>
              <Chat/>
              <Detail/>
            </>}
          </>):(<LoginComp/>)
      }
      <Notification/>
    </div>
  );
}

export default App;
