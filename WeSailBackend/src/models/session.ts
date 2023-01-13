import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registrationNumber: String,
    LYS: String,
    homePort: String,
    draught: String,
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
    ] 
})

const Boat = mongoose.model('Session', sessionSchema)

export default Boat