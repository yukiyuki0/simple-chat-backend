export class Room {
  constructor(private title: string) {}
  public static create(title: string) {
    return new Room(title)
  }
}