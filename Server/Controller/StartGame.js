const GameTime = require('./GameTime')
const gameTime = new GameTime
const {InfGame,InfTypeStatus} = require('../Models/PrototypesGame')
const { v4: uuidv4 } = require('uuid');
const statusServer= require("../StatusServer.js")

module.exports = class RoomCode{
	startNewRoom(req,res){
		const roomCode = req.body.roomCode
		const playerName = req.body.playerName
		const existCode = gameRooms.verifyRoomCode(roomCode)
		if(existCode){
			const game = gameRooms.createdRooms[roomCode]
			const availabilityPlay = game.verifyPlayers()
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
			gameRooms.addNewRoom(roomCode,playerCode,playerName,playerColor)
			const status = new InfGame(gameRooms.createdRooms[roomCode],playerCode,statusServer.room.connectedRoom)
			res.status(200).send(status)
		}	
	}

	connectInARoom(req,res){
		const roomCode = req.body.roomCode
		const playerName = req.body.playerName
		const existCode = gameRooms.verifyRoomCode(roomCode)
		if(existCode){
			const game = gameRooms.createdRooms[roomCode]
			const availabilityPlay = game.verifyPlayers()
			if(availabilityPlay){
				const playerCode = uuidv4()
				const playerColor = "Black"
				game.addSecondPlayer(playerCode,playerName,playerColor)
				const status = new InfGame(game,playerCode,statusServer.room.connectedRoom)
				res.status(200).send(status)
				gameTime.verifyDelayToMovement(game)
				gameTime.verifyInactivity(game)
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


