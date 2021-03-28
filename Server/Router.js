const express = require('express')
const router = express.Router()
const RoomCode = require('./Controller/StartGame')
const room= new RoomCode()
const GameMovement = require('./Controller/GameMovement')
const movement = new GameMovement()
const StatusGame = require('./Controller/StatusGame')
const status = new StatusGame
const apiPrefix = "/api/v1/"

const nameRouter = {
    startNewRoom: apiPrefix + "startGame/startNewRoom",
    connectInARoom: apiPrefix + "startGame/connectInARoom",
    updateMovement: apiPrefix + "movementGame/updateMovement",
    getMovement: apiPrefix + "movementGame/getMovement",
    incorrectMovement: apiPrefix + "movementGame/incorrectMovement",
    giveUpGame: apiPrefix + "giveUpGame",
    endGame: apiPrefix + "endGame",
    confirmEndGame: apiPrefix + "confirmEndGame",
    statusGame:apiPrefix + "statusGame"
}

router.post(nameRouter.startNewRoom, room.startNewRoom)

router.post(nameRouter.connectInARoom, room.connectInARoom)

router.post(nameRouter.updateMovement, movement.updateMovement)

router.get(nameRouter.getMovement, movement.getMovement)

router.post(nameRouter.incorrectMovement, movement.incorrectMovement)

router.post(nameRouter.giveUpGame, status.giveUp)

router.post(nameRouter.endGame, status.endGame)

router.post(nameRouter.endGame, status.endGame)

router.get(nameRouter.statusGame,status.getStatusGame)

module.exports = router