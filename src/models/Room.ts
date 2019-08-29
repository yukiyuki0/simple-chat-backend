import { IMessages } from "./Message"

export interface IUser {
  name: string
}

export interface Users extends Array<IUser> {}

export interface IRoom {
  title: string
  users: Users
  maxUser?: number
  messages: IMessages
}
