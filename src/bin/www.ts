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

    // set authorization for socket.io
    io.sockets.on('connection', socketioJwt.authorize({
        secret: (process.env.SECRET_KEY as string),
        decodedPropertyName: "decoded_token",
        timeout: 15000 // 15 seconds to send the authentication message
      })
    ).on('authenticated', function(socket: any) {
      console.log(socket.decoded_token)
      console.log('hello! ' + socket.decoded_token.username);

      socket.on('requestRoomList', function(socket: any) {
        console.log("recv data")
      })
    })


  } catch (e) {
    console.error('✗ Unable to connect to the database:', e.message)
  }

})()
