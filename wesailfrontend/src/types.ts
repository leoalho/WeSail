export interface Friend {
  id: string,
  username: string
}

export interface Boat {
  name: string,
  id: string,
  owners: Friend[],
  crew: Friend[],
  crewRequests: Friend[]
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
  friendRequests: Friend[],
  boats: BoatUser[],
  crewMember: BoatUser[],
  boatsCrew: BoatUser[],
  boatsFollowing: BoatUser[]
}

export type UpdateUser = {
  username?: string,
  passwordHash?: string,
  email?: string,
  friend?: string,
  friendRequest?: string,
  status?: string
}

export interface RootState {
  user: User
}

export type Payload = User | null