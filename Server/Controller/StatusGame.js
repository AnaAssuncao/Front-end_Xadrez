const utilities = require('./utils')
const utils = new utilities
const {infGame,infTypeStatus} = require('../Models/PrototypesGame')
const statusServer= require("../StatusServer.js")

module.exports = class statusGame{
	getStatusGame(req,res){
        const roomCode = req.query.roomCode
        const playerCode = req.query.playerCode
        const existCode = utils.verifyRoomCode(games,roomCode)
        if(existCode){
            const game = games[roomCode]
            game.infPlayers[playerCode].updateTime()
			const statusGame= new infGame(game,playerCode,statusServer.statusGame.chess)
			res.status(200).send(statusGame)
		}
		else{
            const status = new infTypeStatus (statusServer.room.noExistRoom)
			res.status(200).send(status)
		}
    }
    endGame(req,res){
        const roomCode = req.body.roomCode
        const endGame = req.body.endGame
        const playerCode = req.body.playerCode
        const game = games[roomCode]
        const existCode = utils.verifyRoomCode(games,roomCode)
        if(existCode){
            if(endGame){
                game.updateEndGamePlayer(playerCode)
                utils.endGamePlayer(games,game)
                const statusGame= new infGame(game,playerCode,statusServer.statusGame.endGame)
                res.status(200).send(statusGame)
            }
            else{
                const statusGame= new infGame(game,playerCode,statusServer.statusGame.chess)
                res.status(200).send(statusGame)
            }
        }  
        else{
            const status = new infTypeStatus (statusServer.room.noExistRoom)
			res.status(200).send(status)
		}
    }

    giveUp(req,res){
        const roomCode = req.body.roomCode
        const playerCode = req.body.playerCode
        const giveUp = req.body.giveUp
        const existCode = utils.verifyRoomCode(games,roomCode)
        if(existCode){
            const game = games[roomCode]
            if(giveUp){
                game.updateGiveUpPlayer(playerCode)
                utils.endGamePlayer(games,game)
                const statusGame= new infGame(game,playerCode,statusServer.statusGame.giveUp)
                res.status(200).send(statusGame)
            }
            else{
                const statusGame= new infGame(game,playerCode,statusServer.statusGame.chess)
                res.status(200).send(statusGame)
            }
        }
        else{
			const status = new infTypeStatus (statusServer.room.noExistRoom)
			res.status(200).send(status)
		}
    }
}