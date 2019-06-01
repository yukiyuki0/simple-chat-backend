//
//  User.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { Document, Schema, model as defineModel } from "mongoose"

export interface User extends Document {
  username: string
  password: string
  profilePic?: string
}

const schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  profilePic: {type: String, required: false}
})

export const model = defineModel<User>('User', schema)
