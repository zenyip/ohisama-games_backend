const scoresRouter = require('express').Router()
const Score = require('../models/score')

scoresRouter.get('/hiyohina', async (request, response, next) => {
	try {
        const scores = await Score.find({ game: "hiyohina" })
        await scores.sort((a, b) => {
            return b.score - a.score
        })

		response.json(scores.slice(0, 10).map(score => score.toJSON()))

	} catch (exception) {
		next(exception)
	}
})

scoresRouter.get('/qko10', async (request, response, next) => {
	try {
        const scores = await Score.find({ game: "qko10" })
        await scores.sort((a, b) => {
            return a.score - b.score
        })

		response.json(scores.slice(0, 10).map(score => score.toJSON()))

	} catch (exception) {
		next(exception)
	}
})

scoresRouter.get('/qko25', async (request, response, next) => {
	try {
        const scores = await Score.find({ game: "qko25" })
        await scores.sort((a, b) => {
            return a.score - b.score
        })

		response.json(scores.slice(0, 10).map(score => score.toJSON()))

	} catch (exception) {
		next(exception)
	}
})

scoresRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body

		if (body.player.length < 3 || body.player.length > 10) {
			return response.status(400).json({ error: 'player name have to be 3-10 characters long' })
		}

		let tidiedScore = body.score
		if (body.game == 'qko10' || body.game == 'qko25') {
			tidiedScore = Number(Math.round(tidiedScore+'e3')+'e-3')
		}

		const score = new Score({
			game: body.game,
			player: body.player,
			score: tidiedScore
		})

		const savedScore = await score.save()

		response.json(savedScore)
	} catch (exception) {
		next(exception)
	}
})

module.exports = scoresRouter