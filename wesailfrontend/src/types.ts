export interface Friend {
  id: string,
  username: string
}

export interface Boat {
  name: string,
  id: string
}

export interface User {
  username: string,
  id: string,
  email: string,
  friends: Friend[],
  boats: Boat[],
  boatsCrew: Boat[]
}

export interface RootState {
  user: User
}

export type Payload = User | null