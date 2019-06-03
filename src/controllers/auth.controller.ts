//
//  auth.controller.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { Request, Response, NextFunction } from "express"
import { AuthRepository } from "../repositories/auth.repository"
import { UserDocument } from "../models/User"
import { sign } from "jsonwebtoken"

const authRepo = new AuthRepository()

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body

  if (!username || !password) return res.status(403).send({messages: "No input data"})

  const user = <UserDocument>{
    username: username,
    password: password,
    profilePic: ''
  }
  try {
    const users = await authRepo.read({username: user.username})
    if (users.length) {
      return res.status(403).send({messages: "Exist user"})
    }

    await authRepo.create(user)

    console.log("Created user", user)

    return res.status(200).send({user})
  } catch (e) {
    next(e)
  }

}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body

  const SECRET_KEY = (process.env.SECRET_KEY as string)

  try {
    const users = await authRepo.read({username: username})

    if (users.length) {
      const result = await users[0].comparePassword(password)

      if (!result) {
        return res.status(403).json({result: false, messages: 'Login failed\nPlease confirm your password'})
      }

      return res.status(200).json({result: true, messages: 'Login successful', token: sign(users[0].toJSON(), SECRET_KEY, {
        expiresIn: 3600000 // 1 hours
        })})
    } else {
      return res.status(401).json({result: false, messages: 'Bad credentials'})
    }
  } catch (e) {
    next(e)
  }

}
