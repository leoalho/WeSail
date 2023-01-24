export interface Friend {
  id: string,
  username: string
}

export interface Boat {
  name: string,
  id: string,
  owners: string[],
  crew: string[]
}

export interface BoatUser {
  name: string,
  id: string
}

export interface User {
  username: string,
  id: string,
  email: string,
  friends: Friend[],
  boats: BoatUser[],
  crewMember: BoatUser[],
  boatsCrew: BoatUser[],
  boatsFollowing: BoatUser[]
}

export interface RootState {
  user: User
}

export type Payload = User | null