//
//  user.routes.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 04/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//

import { Router } from "express"
import { me } from "../../controllers/user.controller"
import { authMiddleware } from "../../middlewares/auth"

const router = Router()

router.use('/users/me', authMiddleware)
router.get('/users/me', me)

export default router
