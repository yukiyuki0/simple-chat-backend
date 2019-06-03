//
//  index.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { Router } from "express"
import auth from "./auth.routes"
import user from "./user.routes"

const router = Router()
router.use(auth)
router.use(user)


export default router
