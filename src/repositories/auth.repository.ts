//
//  auth.repository.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//

import { DocumentQuery, Query } from "mongoose"
import { User, model as UserModel } from "../models/User"

export class AuthRepository {
  constructor() {}

  create(user: User): Promise<User> {
    const u = new UserModel(user)
    return u.save()
  }

  read(query: any): DocumentQuery<User[], User> {
    return UserModel.find(query)
  }

  update(user: User): Query<number> {
    return UserModel.update({username: user.username}, {...user})
  }

  delete(user: User) {
    return UserModel.remove({username: user.username})
  }
}
