import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  status: { type: String, default: "user" },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequestsPending: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
  boats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Boat" }],
  crewRequestsPending: [{ type: mongoose.Schema.Types.ObjectId, ref: "Boat" }],
  crewMember: [{ type: mongoose.Schema.Types.ObjectId, ref: "Boat" }],
  boatsFollowing: [{ type: mongoose.Schema.Types.ObjectId, ref: "Boat" }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
