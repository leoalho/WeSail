import mongoose from 'mongoose'

const boatSchema = new mongoose.Schema({
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

const Boat = mongoose.model('Boat', boatSchema)

export default Boat