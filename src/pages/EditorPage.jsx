import React, { useState ,useRef,useEffect } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket'
import { ACTIONS } from '../actions'
import { useLocation,useNavigate , Navigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
 
const EditorPage = () => {
  const socketRef = useRef(null)
  const location = useLocation()
  const reactNavigator = useNavigate()
  const {roomId} = useParams()

  useEffect(()=>{
    const init = async() => {  
      socketRef.current = await initSocket()
      socketRef.current.on('connect-error',(err) => handleError(err)) 
      socketRef.current.on('connect-failed',(err) => handleError(err))

      function handleError(e){
        console.log('Socket error',e)
        toast.error("Socket Connection failed, try again later")
        reactNavigator('/')
      }
      
      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        username: location.state?.username, 
      })  
    }
    init()
  },[])

  const [clients,setClients] = useState([
    {socketId:1, username : "user1"},
    {socketId:2 ,username : "user2"},
    {socketId:3 ,username : "user3"},
    {socketId:4, username : "user4"}
  ])

  if(!location.state){
    return <Navigate to="/" />
  }

  return (
    <div className='mainWrapper'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='sideText'>
            <h2>Code Space</h2>
          </div>
          <h3>Connected</h3>
          <div className='clientList'>
            {
              clients.map((client) =>(
                <Client key={client.socketId} username={client.username} />
              ))
            }
          </div>
        </div>
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  )  
}

export default EditorPage 