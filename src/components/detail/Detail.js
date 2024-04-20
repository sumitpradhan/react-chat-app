import "./detail.css"
import React from 'react'

const Detail = () => {
  return (
    <div className="detail">

        <div className="user">
            <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
            <div className="texts">
                <h2>John Doe</h2>
                <p>Hello</p>
            </div>
        </div>

        <div className="info">

          <div className="option">
            <div className="title">
              <span>Chat Settings</span>
              <img src={require('../../Assets/Img/arrowUp.png')} alt="profile" />
            </div>
          </div>
          
          <div className="option">
            <div className="title">
              <span>Privacy</span>
              <img src={require('../../Assets/Img/arrowUp.png')} alt="profile" />
            </div>
          </div>
          
          <div className="option">
            <div className="title">
              <span>Shared Photos</span>
              <img src={require('../../Assets/Img/arrowDown.png')} alt="profile" />
            </div>
          </div>
          
          <div className="option">
            <div className="photos">

                <div className="photoItem">
                  <div className="photoDetail">
                    <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
                    <span>photu.png</span>
                  </div>
                  <img src={require('../../Assets/Img/download.png')} className="icon" alt="profile" />
                </div>

                    <div className="photoItem">
                  <div className="photoDetail">
                    <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
                    <span>photu.png</span>
                  </div>
                  <img src={require('../../Assets/Img/download.png')} className="icon" alt="profile" />
                </div>
                <div className="photoItem">
                  <div className="photoDetail">
                    <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
                    <span>photu.png</span>
                  </div>
                  <img src={require('../../Assets/Img/download.png')} className="icon" alt="profile" />
                </div>
                <div className="photoItem">
                  <div className="photoDetail">
                    <img src={require('../../Assets/Img/avatar.png')} alt="profile" />
                    <span>photu.png</span>
                  </div>
                  <img src={require('../../Assets/Img/download.png')} className="icon" alt="profile" />
                </div>
            </div>
          </div>
       
          <div className="option">
            <div className="title">
              <span>Shared Files</span>
              <img src={require('../../Assets/Img/arrowDown.png')} alt="profile" />
            </div>
          </div>

          <button>Block User</button>
          <button className="logout">Logout</button>
        </div>

    </div>
  )
}

export default Detail
