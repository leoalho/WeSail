import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  boat: { type: mongoose.Schema.Types.ObjectId, ref: "Boat" },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: String,
  weather: String,
  distance: Number,
  distanceSailed: Number,
  startTime: Date,
  endTime: Date,
  start: String,
  end: String,
  logType: String,
});

logSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
