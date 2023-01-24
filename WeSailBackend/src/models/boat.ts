import mongoose from 'mongoose'

const boatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registrationNumber: String,
    LYS: Number,
    homePort: String,
    draught: Number,
    owners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    crew: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ] 
})

boatSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Boat = mongoose.model('Boat', boatSchema)

export default Boat