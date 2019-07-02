//
//  www.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import "../libs/dotenv"
import App from "../App"
import Socket from "../Socket"
import { Application } from "express"
import { connect } from "mongoose"
import socketioJwt from "socketio-jwt"
import { IRoom, IUser } from "../models/Room"

const Rooms: IRoom[] = [];

(async () => {
  const port: number = Number(process.env.PORT) || 3000
  try {
    await connect(`mongodb://${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_DATABASE}`)

    console.log('✓ Database connection has been established successfully.')

    const app: Application = new App().getApp
    app.listen(port, () => console.log(`Express server listening on ${port}`))
      .on('error', err => console.error(err))

    const socketEvents = new Socket(app)

    const socketServer = socketEvents.getServer
    const io = socketEvents.getIO

    socketServer.listen(process.env.SOCKET_PORT, () => {
      console.log('Socket server listening on', process.env.SOCKET_PORT)
    })

    io.on('connection',  (socket: any) => {

      console.log('hello! ', socket.decodedToken);

        socket.on('request-load-room', () => {
          console.log("recv requestRoomList")
          socket.emit('load-room', Rooms)
        })

        socket.on('create-room', (data: any) => {
          const room: IRoom = <IRoom>{
            title: data.name,
            users: {},
            maxUser: 10
          }
          Rooms.push(room)
          io.emit('new-room', room)
        })
    })


  } catch (e) {
    console.error('✗ Unable to connect to the database:', e.message)
  }

})()
