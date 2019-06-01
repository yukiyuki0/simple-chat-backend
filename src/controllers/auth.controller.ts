//
//  auth.controller.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { Request, Response, NextFunction } from "express";

export const register = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body

  if ( !username || !password ) return res.status(500).send({ error: "No input data" })


}
