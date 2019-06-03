//
//  App.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import express, { Application } from "express"
import { createServer, Server } from "http"
import v1 from "./routes/v1"
import { urlencoded, json } from "body-parser"
import cors from "cors"

export default class App {
  private readonly app: Application
  private readonly server: Server


  constructor() {
    this.app = express()
    this.server = createServer(this.app)

    this.app.use(urlencoded({ extended: true }))
    this.app.use(json())
    this.app.use(cors({
      // credentials: true,
      // origin: process.env.FRONT_ORIGIN
    }))
    this.app.use('/v1', v1)
  }

  public get getApp() {
    return this.app
  }

}
