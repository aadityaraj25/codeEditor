import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    // console.log(id)
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("roomId & username is required");
      return;
    }

    navigate(`/editor/${roomId}`,{
      state:{
        userName,
      }
    })
  }

  const handleInputEnter = (e) =>{
    // console.log('event',e.code)
    if(e.code ==='Enter'){
      joinRoom()
    }

  }

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <h1 className="mainLabel">Paste Invitation Room</h1>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onKeyUp={handleInputEnter}
          />
          <button onClick={joinRoom} className="btn joinBtn"> Join </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              New Room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Connect on <a href="https://github.com/aadityaraj25">Github</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
