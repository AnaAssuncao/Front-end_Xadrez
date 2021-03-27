module.exports = class utils{
    #times={
        connectPlayer: 300000, 
        movement:300000,
        checkPlayer: 1000, 
        checkMovement: 1000,
        limitEndGame:60
    }
    verifyRoomCode= function (games,roomCode){
        if(games[roomCode]){
            return true
        }
        return false
    }
    
    verifyPlayers= function(game){
        if(game.playersCode.white!==null && game.playersCode.black!==null){
            return false
        }
        return true
    }
    verifyConnectionPlayers = function(game){
        let connectionPlayers = false
        if(game.infPlayers[game.playersCode.white].connection===true){
            connectionPlayers=true
        }
        if(game.playersCode.black){
            if( game.infPlayers[game.playersCode.black].connection===true){
                connectionPlayers=true
            }
        }
        return connectionPlayers
    }

    verifyTimePlayers(games,game){
        const timePlayers = setInterval(()=>{
            const existCode = this.verifyRoomCode(games,game.roomCode)
            if(existCode){
                for(let playerCode in game.infPlayers){
                    if((Date.now()-game.infPlayers[playerCode].time)>this.#times.connectPlayer){
                        clearInterval(timePlayers) 
                        game.updateGiveUpPlayer(playerCode)
                    }
                }
            }
            else {
                clearInterval(timePlayers) 
            }

        },this.#times.checkPlayer)
    }

    verifyTimeMovement(games,game){
        const timeMovement=setInterval(()=>{
            const existCode = this.verifyRoomCode(games,game.roomCode)
            if(existCode){
                if(game.lastMove.movementTime){
                    if((Date.now()-game.lastMove.movementTime)>this.#times.movement){
                        clearInterval(timeMovement) 
                        game.updateGiveUpPlayer(game.lastMove.playerCode)
                    }
                    const arePlayersConnected = this.verifyConnectionPlayers(game) 
                    if(arePlayersConnected===false){
                        clearInterval(timeMovement) 
                    }
                }
            }
        },this.#times.checkMovement)  
    }

    endGamePlayer(games,game,timeCounter=0){
        setTimeout(()=>{  
            const existCode = this.verifyRoomCode(games,game.roomCode)
            if(existCode){     
                const arePlayersConnected = this.verifyConnectionPlayers(game) 
                if((arePlayersConnected===false) || (timeCounter===this.#times.limitEndGame)){       
                    this.finalizeCode(games,game.roomCode)
                }
                else{
                    timeCounter++
                    this.endGamePlayer(game,timeCounter)
                }
            }
        },this.#times.checkPlayer)
    }

    finalizeCode(games,roomCode){
        setTimeout(()=>delete games[roomCode],30000)
    }
}