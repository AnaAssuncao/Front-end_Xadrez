const { InfMovement, InfTypeStatus  } = require('../Models/PrototypesGame')
const statusServer= require("../StatusServer.js")

module.exports= class Movement {
    updateMovement= async function(req,res){
        const roomCode = req.body.roomCode
        const playerCode = req.body.playerCode
        const moveSent = req.body.movement
        const existCode = gameRooms.verifyRoomCode(roomCode)
        if(existCode){
            const game = gameRooms.createdRooms[roomCode]
           if(game.lastMove.playerCode!==playerCode){
                const movementTime= Date.now()
                game.updateLastMove(moveSent, playerCode,movementTime)
                if(game.lastMove.availableMovement === true ){
                    const status = new InfMovement(game, playerCode, statusServer.movement.correctMovement)
                    res.status(200).send(status)
                }
                else{
                    const status = new InfMovement(game, playerCode, statusServer.movement.waitAgain)
                    res.status(200).send(status)
                }
            }
            else{
                const status = new InfMovement(game, playerCode, statusServer.movement.waitAgain)
                res.status(200).send(status)
            }
        }
		else{
			const status = new InfTypeStatus (statusServer.room.noExistRoom)
			res.status(200).send(status)
		}
    }

    getMovement = function(req,res){
        const roomCode = req.query.roomCode
        const playerCode = req.query.playerCode
        const existCode = gameRooms.verifyRoomCode(roomCode)
        if(existCode){
            const game = gameRooms.createdRooms[roomCode]
            if(game.lastMove.playerCode!==playerCode){
                if(game.lastMove.availableMovement === true){
                    const status = new InfMovement(game, playerCode, statusServer.movement.movementAvailable)
                    res.status(200).send(status)
                }
                else{
                    const status = new InfMovement(game, playerCode, statusServer.movement.movementUnavailable)
                    res.status(200).send(status)
                }      
            }
            else if(game.lastMove.incorretMovement){
                const status = new InfMovement(game, playerCode, statusServer.movement.incorrectMovement)
                res.status(200).send(status)
            }
            else{
                    const status = new InfMovement(game, playerCode, statusServer.movement.waitAgain)
                    res.status(200).send(status)
            }
        }
		else{
			const status = new InfTypeStatus (statusServer.room.noExistRoom)
			res.status(200).send(status)
		}
    }

    incorrectMovement(req,res){
        const roomCode = req.body.roomCode
        const playerCode = req.body.playerCode
        const incorrectMovement = req.body.incorrectMovement
        const existCode = gameRooms.verifyRoomCode(roomCode)
        if(existCode){
            const game = gameRooms.createdRooms[roomCode]
            if(game.lastMove.playerCode!==playerCode){
                if(incorrectMovement===true){
                    game.reportIncorretMovement()
                    res.status(200).send(statusServer.movement.confirmedMove)
                }
            }
            else{
                res.status(200).send(statusServer.movement.waitAgain)
            }
        }
		else{
			const status = new InfTypeStatus (statusServer.room.noExistRoom)
			res.status(200).send(status)
		}
    }
}