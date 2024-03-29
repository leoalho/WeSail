import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  created: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  value: String,
});

const boatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: String,
  LYS: Number,
  homePort: String,
  draught: Number,
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  crew: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  crewRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  todos: [todoSchema],
  profilePicture: { type: Boolean, default: false },
});

boatSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Boat = mongoose.model("Boat", boatSchema);

export default Boat;
