const Utilities = require('./utils')
const utils = new Utilities
const Room = require('../Models/roomGame')
const {InfGame,InfTypeStatus} = require('../Models/PrototypesGame')
const { v4: uuidv4 } = require('uuid');
const statusServer= require("../StatusServer.js")

module.exports = class RoomCode{
	startNewRoom(req,res){
		const roomCode = req.body.roomCode
		const playerName = req.body.playerName
		const existCode = utils.verifyRoomCode(games,roomCode)
		if(existCode){
			const game = games[roomCode]
			const availabilityPlay = utils.verifyPlayers(game)
			if(availabilityPlay){
				const status = new InfTypeStatus(statusServer.room.roomWithOnePlayer)
				res.status(200).send(status)
			}
			else{
				const status = new InfTypeStatus (statusServer.room.roomUnavailable)
				res.status(200).send(status)
			}
		}
		else{
			const playerCode = uuidv4()
			const playerColor = "White"
			const newGame = new Room(roomCode,playerCode,playerName,playerColor)
			games[roomCode] = newGame
			const status = new InfGame(newGame,playerCode,statusServer.room.connectedRoom)
			res.status(200).send(status)
		}	
	}

	connectInARoom(req,res){
		const roomCode = req.body.roomCode
		const playerName = req.body.playerName
		const existCode = utils.verifyRoomCode(games,roomCode)
		if(existCode){
			const game = games[roomCode]
			const availabilityPlay = utils.verifyPlayers(game)
			if(availabilityPlay){
				const playerCode = uuidv4()
				const playerColor = "Black"
				game.addSecondPlayer(playerCode,playerName,playerColor)
				const status = new InfGame(game,playerCode,statusServer.room.connectedRoom)
				res.status(200).send(status)
				utils.verifyTimeMovement(games,game)
				utils.verifyTimePlayers(games,game)
			}
			else{
				const status = new InfTypeStatus (statusServer.room.roomUnavailable)
				res.status(200).send(status)
			}
		}
		else{
			const status = new InfTypeStatus (statusServer.room.noExistRoom)
			res.status(200).send(status)
		}
	}
}


