import { IMessages } from "./Message"

export interface IUser {
  name: string
}

export interface IRoom {
  title: string
  users: IUser[]
  maxUser?: number
  messages: IMessages
}
