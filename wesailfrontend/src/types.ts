export interface Friend {
  id: string,
  username: string
}

export interface Boat {
  name: string,
  id: string,
  owners: Friend[],
  crew: Friend[],
  crewRequests: Friend[],
  followers: Friend[]
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
  friendRequestsPending: Friend[],
  boats: BoatUser[],
  crewRequestsPending: BoatUser[]
  crewMember: BoatUser[],
  boatsCrew: BoatUser[],
  boatsFollowing: BoatUser[],
  events: string[]
}

export type UpdateUser = {
  username?: string,
  passwordHash?: string,
  email?: string,
  friend?: string,
  friendRequest?: string,
  friendRequestsPending?: string,
  status?: string,
  boatsFollowing?: string,
  event?: string
}

type Op = 'add' | 'remove' | 'replace'

export type Patch = {
  op: Op,
  path: string,
  value: string
}

export type UpdateBoat = {
  name?: string,
  crewRequest?: string,
  crew?: string,
  follower?: string
}

export interface RootState {
  user: User
}

export type Payload = User | null

export interface Event {
  boat: BoatUser,
  date: string,
  time: string,
  location: string,
  description: string,
  owner: string,
  participants: User[],
  id: string
}

export interface UpdateEvent {
  participant?: string
}

export interface Log {
    boat: BoatUser,
    creator: Friend,
    participants: Friend[],
    description: string,
    startTime: string,
    endTime: string,
    start: string,
    end: string,
    id: string
}

export enum Application {
  No,
  Pending,
  Accepted
}