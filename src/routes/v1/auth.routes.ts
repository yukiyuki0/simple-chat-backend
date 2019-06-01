//
//  auth.routes.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { Router } from "express"
import { register } from "../../controllers/auth.controller"

const router = Router()

router.post('/auth/register', register)

export default router
