import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    boats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Boat'
        }
    ],
    date: Date
})

const Session = mongoose.model('Session', sessionSchema)

export default Session