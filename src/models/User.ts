//
//  User.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//
import { NextFunction } from "express"
import { Document, Schema, model as defineModel } from "mongoose"
import { genSalt, hash, compare } from "bcrypt-nodejs"

export interface UserDocument extends Document {
  username: string
  password: string
  profilePic?: string
}

export interface User extends UserDocument {
  comparePassword(candidatePassword: string): boolean
  toJSON(): object
}

const schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  profilePic: {type: String, required: false}
})

schema.pre<UserDocument>('save', async function (next: NextFunction) {
  const user = this
  const FACTOR = 8

  if (!user.isModified('password')) return next()

  try {

    const salt: string = await new Promise((resolve: any, reject: any) => {
      genSalt(FACTOR, (err: Error, salt: string) => {
        if (err) reject(err)
        resolve(salt)
      })
    })

    const encryptedPassword: string = await new Promise((resolve: any, reject: any) => {
      hash(user.password, salt, () => {}, (err: Error, hash: string) => {
        if (err) reject(err)
        resolve(hash)
      })
    })

    user.password = encryptedPassword
  } catch (e) {
    next(e)
  }

})

schema.method('comparePassword', async function (this: User, candidatePassword: string) {
  const isMatch = await new Promise((resolve: any, reject: any) => {
    compare(candidatePassword, this.password, (err: Error, match: boolean) => {
      if (err) reject(err)
      resolve(match)
    })
  })
  return isMatch
})

schema.method('toJSON', function (this: User) {
  return {
    id: this._id,
    username: this.username
  }
})


export const model = defineModel<User>('User', schema)
