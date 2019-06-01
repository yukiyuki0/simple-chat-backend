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
import { connect } from "mongoose"


(async () => {
  const port: number = Number(process.env.PORT) || 3000
  try {
    await connect(`mongodb://${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_DATABASE}`)

    console.log('✓ Database connection has been established successfully.')

    const app: Application = new App().getApp
    app.listen(port, () => console.log(`Express server listening on ${port}`))
      .on('error', err => console.error(err))
  } catch (e) {
    console.error('✗ Unable to connect to the database:', e.message)
  }

})()
