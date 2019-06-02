//
//  auth.repository.ts
//  simple-chat-backend
//
//  Created by Yukihira Nanako on 02/06/2019.
//  Copyright © 2019 Yukihira Nanako. All rights reserved.
//

import { DocumentQuery, Query } from "mongoose"
import { User, UserDocument, model } from "../models/User"

export class AuthRepository {
  constructor() {}

  create(user: UserDocument): Promise<User> {
    const u = new model(user)
    return u.save()
  }

  read(query: any): DocumentQuery<User[], User> {
    return model.find(query)
  }

  update(user: UserDocument): Query<number> {
    return model.update({username: user.username}, {...user})
  }

  delete(user: UserDocument) {
    return model.remove({username: user.username})
  }
}
