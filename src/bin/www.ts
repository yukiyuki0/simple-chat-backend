//
//  www.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import "../libs/dotenv"
import App from "../App"
import { Application } from "express"

const port: number = Number(process.env.PORT) || 3000


const app: Application = new App().getApp
app.listen(port, () => console.log(`Express server listening on ${port}`))
  .on('error', err => console.error(err))
