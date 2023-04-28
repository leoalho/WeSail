/* eslint-disable @typescript-eslint/no-misused-promises */
import { v4 as uuidv4 } from "uuid";
import { sendForgottenPwdEmail, sendRegistrationEmail } from "./emailService";
import User from "../models/user";
import { NewUserEntry } from "../types";
import Forgotten from "../models/forgotten";
import { hashPassword } from "../utils/utils";

export const getUsers = async () => {
  const users = await User.find({})
    .populate("friends", { username: 1 })
    .populate("boats", { name: 1 });
  return users;
};

export const newUser = async (userEntry: NewUserEntry) => {
  const user = new User(userEntry);
  await user.save();
  await sendRegistrationEmail(user.email, user.username);
  return user;
};

export const findUser = async (username: string) => {
  const user = await User.findOne({ username: username })
    .populate("friends", { username: 1 })
    .populate("boats", { name: 1 })
    .populate("crewMember", { name: 1 })
    .populate("crewRequestsPending", { name: 1 })
    .populate("boatsFollowing", { name: 1 })
    .populate("friendRequests", { username: 1 })
    .populate("friendRequestsPending", { username: 1 });
  return user;
};

export const findUserId = async (id: string) => {
  const user = await User.findById(id)
    .populate("friends", { username: 1 })
    .populate("boats", { name: 1 })
    .populate("crewMember", { name: 1 })
    .populate("crewRequestsPending", { name: 1 })
    .populate("boatsFollowing", { name: 1 })
    .populate("friendRequests", { username: 1 })
    .populate("friendRequestsPending", { username: 1 });
  return user;
};

export const forgottenPassword = async (username: string) => {
  const user = await User.findOne({ username: username });
  const link = uuidv4();
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPassword = new Forgotten({ user: user.id, hash: link });
    await newPassword.save();
    await sendForgottenPwdEmail(user?.email, user?.username, link);
  } else {
    throw new Error("User not found");
  }
};

export const renewPassword = async (hash: string, password: string) => {
  const forgotten = await Forgotten.findOne({ hash: hash });
  if (forgotten) {
    const newuser = await User.findById(forgotten.user);
    if (newuser) {
      newuser.passwordHash = hashPassword(password);
      await newuser.save();
      await forgotten.delete();
    } else {
      throw new Error("User not found");
    }
  } else {
    throw new Error("Incorrect url");
  }
};

export const deleteUser = async (id: string) => {
  await User.deleteOne({ _id: id });
};
