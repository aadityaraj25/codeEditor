import express from "express";
import http from "http";
import {Server} from 'socket.io'
import { ACTIONS } from "./src/actions.js";

const app = express();
const server = http.createServer(app)
const io = new Server(server)

const userSocketMap={}
function getAllConnectedClients(roomId){
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username: userSocketMap[socketId],
        }
    })
}

io.on('connection',(socket)=>{
    console.log('socket-connected', socket.id)
    socket.on(ACTIONS.JOIN,({roomId,username}) => {
        userSocketMap[socket.id] = username
        socket.join(roomId) 
        const clients = getAllConnectedClients(roomId)
        console.log(clients)
    })
})

const PORT = process.env.PORT || 3000
server.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`)
})