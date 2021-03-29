module.exports = class Utils{
    #times={
        connectPlayer: 300000, 
        movement:300000,
        checkPlayer: 1000, 
        checkMovement: 1000,
        limitEndGame:60
    }
    
    verifyInactivity(game){
        const timePlayers = setInterval(()=>{
            const existCode = gameRooms.verifyRoomCode(game.roomCode)
            if(existCode){
                for(let playerCode in game.infPlayers){
                    if((Date.now()-game.infPlayers[playerCode].time)>this.#times.connectPlayer){
                        clearInterval(timePlayers) 
                        game.updateGiveUpPlayer(playerCode)
                        this.verifyToEndGame(game)
                    }
                }
            }
            else {
                clearInterval(timePlayers) 
            }

        },this.#times.checkPlayer)
    }

    verifyDelayToMovement(game){
        const timeMovement=setInterval(()=>{
            const existCode = gameRooms.verifyRoomCode(game.roomCode)
            if(existCode){
                if(game.lastMove.movementTime){
                    if((Date.now()-game.lastMove.movementTime)>this.#times.movement){
                        clearInterval(timeMovement) 
                        game.updateGiveUpPlayer(game.lastMove.playerCode)
                        this.verifyToEndGame(game)
                    }
                    const arePlayersConnected = game.verifyConnectionPlayers(game) 
                    if(arePlayersConnected===false){
                        clearInterval(timeMovement) 
                    }
                }
            }
        },this.#times.checkMovement)  
    }

    verifyToEndGame(game,timeCounter=0){
        setTimeout(()=>{  
            const existCode = gameRooms.verifyRoomCode(game.roomCode)
            if(existCode){     
                const arePlayersConnected = game.verifyConnectionPlayers(game) 
                if((arePlayersConnected===false) || (timeCounter===this.#times.limitEndGame)){       
                    gameRooms.removeRoom(game.roomCode)
                }
                else{
                    timeCounter++
                    this.verifyToEndGame(game,timeCounter)
                }
            }
        },this.#times.checkPlayer)
    }
}