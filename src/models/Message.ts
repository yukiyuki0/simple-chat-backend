export interface IMessage {
  roomId: string // why use type "string"?
  content: string
  username: string
  datetime: Date
}

export interface IMessages extends Array<IMessage> {
  [index: number]: IMessage
}
