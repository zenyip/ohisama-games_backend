const config = require('./utils/config')
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const timeRouter = require('./controllers/time')
const scoresRouter = require('./controllers/scores')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message)
	})

mongoose.set('useFindAndModify', false)

//app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

//app.use(middleware.tokenExtractor)

app.use('/api/time', timeRouter)
app.use('/api/scores', scoresRouter)
/*
const catchAll = (request, response) => {
	response.sendFile(path.join(__dirname+'/build/index.html'))
}
*/
//app.get('/*', catchAll)

/*if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}*/

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app