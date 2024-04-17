import {useState} from 'react'
import "./chatList.css"
const ChatLists = () => {

  const [addMode,setAddMode]=useState(false);
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

        <div className="item">
            <img src={require('../../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <h2>John Doe</h2>
                <p>Hello</p>
            </div>
        </div>

        <div className="item">
            <img src={require('../../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <h2>John Doe</h2>
                <p>Hello</p>
            </div>
        </div>

        <div className="item">
            <img src={require('../../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <h2>John Doe</h2>
                <p>Hello</p>
            </div>
        </div>
        
        <div className="item">
            <img src={require('../../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <h2>John Doe</h2>
                <p>Hello</p>
            </div>
        </div>
    </div>
  )
}

export default ChatLists
