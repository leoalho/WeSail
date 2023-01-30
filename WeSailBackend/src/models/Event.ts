import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  boat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boat'    
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  
  },
  location: {
    type: String
  },
  description: {
    type: String
  }
})

eventSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Event = mongoose.model('Event', eventSchema)

export default Event