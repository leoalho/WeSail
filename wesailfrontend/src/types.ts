export interface Friend {
  id: string,
  username: string
}

export interface User {
  username: string,
  id: string,
  email: string,
  friends: Friend[],
  boatsOwner: string[],
  boatsCrew: string[]
}

export interface RootState {
  user: User
}

export type Payload = User | null