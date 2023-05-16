export interface Friend {
  id: string;
  username: string;
}

export interface TodoEntry {
  createdBy: string;
  created: string | Date;
  value: string;
}

export interface Todo {
  _id: string;
  createdBy: string;
  created: string | Date;
  value: string;
}

export interface Boat {
  name: string;
  id: string;
  owners: Friend[];
  crew: Friend[];
  crewRequests: Friend[];
  followers: Friend[];
  todos: Todo[];
  profilePicture: boolean;
}

export interface BoatUser {
  name: string;
  id: string;
  profilePicture: boolean;
}

export interface User {
  username: string;
  id: string;
  email: string;
  friends: Friend[];
  friendRequests: Friend[];
  friendRequestsPending: Friend[];
  boats: BoatUser[];
  crewRequestsPending: BoatUser[];
  crewMember: BoatUser[];
  boatsCrew: BoatUser[];
  boatsFollowing: BoatUser[];
  events: string[];
}

export type UpdateUser = {
  username?: string;
  passwordHash?: string;
  email?: string;
  friend?: string;
  friendRequest?: string;
  friendRequestsPending?: string;
  status?: string;
  boatsFollowing?: string;
  event?: string;
};

type Op = "add" | "remove" | "replace";

export type Patch = {
  op: Op;
  path: string;
  value: string | TodoEntry;
};

export type UpdateBoat = {
  name?: string;
  crewRequest?: string;
  crew?: string;
  follower?: string;
};

export interface RootState {
  user: User;
}

export type Option = {
  value: string;
  label: string;
};

export type Payload = User | null;

type LogType = "sail" | "maintenance";

export interface Event {
  boat: BoatUser;
  date: string;
  time: string;
  location: string;
  description: string;
  creator: string;
  participants: User[];
  id: string;
  eventType: LogType;
}

export interface UpdateEvent {
  participant?: string;
}

export interface Log {
  boat: BoatUser;
  creator: Friend;
  participants: Friend[];
  description: string;
  startTime: string;
  endTime: string;
  start: string;
  end: string;
  id: string;
  logType: LogType;
}

export enum Application {
  No,
  Pending,
  Accepted,
}
