//
//  user.controller.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 04/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//

import { Request, Response, NextFunction } from "express"


export const me = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({user: (req as any).userdata })
}
