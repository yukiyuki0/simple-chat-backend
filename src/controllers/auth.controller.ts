//
//  auth.controller.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { Request, Response, NextFunction } from "express"
import { AuthRepository } from '../repositories/auth.repository'
import { User } from "../models/User"

const authRepo = new AuthRepository()

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body

  if ( !username || !password ) return res.status(500).send({ error: "No input data" })

  const user = <User>{
    username: username,
    password: password,
    profilePic: ''
  }

  const users = await authRepo.read({username: user.username})
  if (users.length) {
    return res.status(500).send({ error: "Exist user" })
  }

  await authRepo.create(user)

  console.log("Created user", user)

  return res.status(200).send({user})
}
