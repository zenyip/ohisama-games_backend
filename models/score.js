const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    game: {
        type: String,
        required: true
    },
    player: {
		type: String,
		required: true
    },
    score: {
        type:Number,
        required: true
    }
})

scoreSchema.set('toJSON', {
	transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.game
	}
})

module.exports = mongoose.model('Score', scoreSchema)