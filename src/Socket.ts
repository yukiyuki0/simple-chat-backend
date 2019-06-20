//
//  Socket.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 03/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//

import socketIO, { Server as socketServer } from "socket.io"
import { Application } from "express"
import { Server, createServer } from "http"
import socketioJwt from "socketio-jwt"

export default class Socket {

  private readonly io: socketServer
  private readonly server: Server

  constructor(server: Application) {
    this.server = createServer(server)
    this.io = socketIO(this.server)

    this.io.use(socketioJwt.authorize({
      secret: (process.env.SECRET_KEY as string),
      decodedPropertyName: "decodedToken",
      handshake: true,
      callback: false
    }))
  }

  public get getServer() {
    return this.server
  }
  public get getIO() {
    return this.io
  }

}
