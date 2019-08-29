//
//  auth.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 04/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//

import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const wrapAsync = (fn: any) => {
  return function(req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next)
  }
}

export const authMiddleware = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.get('Authorization') || req.body.token || req.query.token || req.headers['x-access-token']

  if (token.startsWith("Bearer ")) {
    token = token.substring(7, token.length)
  } else {
    // no token
    // return an error
    return res.status(403).json({result: false, messages: 'Not logged in'})
  }

  const p = await new Promise((resolve: any, reject: any) => {
    jwt.verify(token, (process.env.SECRET_KEY as string), (err: any, decode: string | object) => {
      if (err) reject(err)
      resolve(decode)
    })
  })

  const onError = (err: Error) => {
    res.status(403).json({
      result: false,
      messages: err.message
    })
  }


  try {
    // Afterwards, Will be implements interface of object.
    (req as any).userdata = await p
    next()
  } catch (e) {
    onError(e)
  }
})
