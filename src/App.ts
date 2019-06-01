//
//  App.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import express, { Application } from "express"
import { createServer, Server } from "http"
import socketIO, { Server as socketServer } from "socket.io"
import v1 from "./routes/v1"
import { urlencoded, json } from "body-parser"


export default class App {
  private readonly app: Application
  private readonly server: Server
  private readonly io: socketServer

  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.io = socketIO(this.server)
    this.app.use(urlencoded({ extended: true }))
    this.app.use(json())
    this.app.use('/v1', v1)
  }

  public get getApp() {
    return this.app
  }
}
