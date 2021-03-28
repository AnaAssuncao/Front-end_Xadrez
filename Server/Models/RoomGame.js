const {InfPlayer} = require('./PrototypesGame')

module.exports = class Room{
    #color={
        white:"White",
        black:"Black",
    }
    constructor(roomCode,playerCode,namePlayer,playerColor){
        this.roomCode = roomCode,
        this.playersCode={
            white:playerCode,
            black:null
        }
        this.infPlayers= {
            // Chave do objeto é o codigo do jogador. Objeto contém as informações de cada jogador.
        }
        this.statusGame = {
            currentPlayer:"White",
            connectionPlayers: false,
            giveUp: false,
            endGame: false,
        }
        this.lastMove = {
            availableMovement:false,
            incorretMovement:false,
            movementTime:null,
            playerCode:null,
            movement: null
            // {movement: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        }
        this.startPlayerOne(playerCode,namePlayer,playerColor)
    }
    
    startPlayerOne(playerCode, namePlayer,playerColor){
        this.infPlayers[playerCode] = new InfPlayer(playerCode, namePlayer,playerColor)
    }
    addSecondPlayer(playerCode,namePlayer,playerColor){
        this.playersCode.black=playerCode
        this.lastMove.playerCode = null
        this.statusGame.connectionPlayers=true
        this.infPlayers[playerCode] = new InfPlayer(playerCode, namePlayer,playerColor)
    }
    updateGiveUpPlayer(playerCode){
        this.statusGame.giveUp=true
        this.statusGame.endGame=true
        this.infPlayers[playerCode].connection=false
        this.infPlayers[playerCode].giveUp=true
        this.infPlayers[playerCode].endGame=true
    }
    updateEndGamePlayer(playerCode){
        this.statusGame.endGame=true
        this.infPlayers[playerCode].connection=false
        this.infPlayers[playerCode].giveUp=false
        this.infPlayers[playerCode].endGame=true
    }
    updateLastMove(movement, playerCode,movementTime){
        if(this.lastMove.movement){
            if(this.lastMove.movement.color!==movement.color){
                this.lastMove.corretMovement= true
                this.lastMove.availableMovement = true
                this.lastMove.playerCode = playerCode
                this.lastMove.movement = movement
                this.lastMove.movementTime = movementTime
            }
            else{
                this.lastMove.availableMovement = false
            }
        }
        else{
            this.lastMove.playerCode = playerCode
            this.lastMove.movement = movement
            this.lastMove.availableMovement = true
            this.lastMove.movementTime = movementTime
        }
        const nextPlayer=(this.#color.white===this.lastMove.movement.color)?this.#color.black:this.#color.white
        this.statusGame.currentPlaye=nextPlayer
    }
    getCodes(playerCode){
        const statusCodes = {
            roomCode:this.roomCode,
            playerCode: playerCode
        }
        return statusCodes
    }
    getLastMovement(){
        const move=this.lastMove.movement
        this.lastMove.availableMovement = false
        return move
    }
    getInfPlayerAdv(playerCode){
        const advCode = (playerCode===this.playersCode.white)? this.playersCode.black:this.playersCode.white
        const statusPlayerAdv ={ 
            namePlayer:null,
            color:null,
            connection:null,
            giveUp:false,
            endGame:false
        }
        if(advCode){
            statusPlayerAdv.namePlayer=this.infPlayers[advCode].namePlayer,
            statusPlayerAdv.color=this.infPlayers[advCode].color,
            statusPlayerAdv.connection=this.infPlayers[advCode].connection,
            statusPlayerAdv.giveUp=this.infPlayers[advCode].giveUp,
            statusPlayerAdv.endGame=this.infPlayers[advCode].endGame  
        }
        return statusPlayerAdv

    }
    getStatusGame(){
        const statusGame = {
            connectionPlayers:this.statusGame.connectionPlayers,
            giveUp:this.statusGame.giveUp,
            endGame:this.statusGame.endGame
        }
        return statusGame
    }
    reportIncorretMovement(){
        this.lastMove.incorretMovement=true
    }
}