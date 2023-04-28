import mongoose from "mongoose";

const forgottenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hash: String,
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 1800,
  },
});

const Forgotten = mongoose.model("Forgotten", forgottenSchema);

export default Forgotten;
