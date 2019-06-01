//
//  dotenv.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { resolve } from "path"
import { config } from "dotenv"

config({ path: resolve(__dirname, "../../.env") })
