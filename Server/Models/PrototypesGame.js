const statusServer= require("../StatusServer.js")

class infGame{
    constructor(game,playerCode,status){
        this.typeStatus = status
        this.statusCodes = game.getCodes(playerCode)
        this.statusPlayerAdv=game.getInfPlayerAdv(playerCode)
        this.statusGame = game.getStatusGame()
    }
}           

class infMovement{
    constructor(game,playerCode,statusMovement){
        this.typeStatus = statusMovement
        this.statusCodes = game.getCodes(playerCode)
        this.statusGame = game.getStatusGame()
        this.move = null
        this.getMovement(game,statusMovement)
    }

    getMovement(game,statusMovement){
        if(statusMovement===statusServer.movement.movementAvailable){
           this.move =  game.getLastMovement()
        }
    }
} 

class infPlayer{
    constructor(playerCode, namePlayer,playerColor,connection=true){
    this.playerCode=playerCode
    this.namePlayer=namePlayer
    this.color= playerColor
    this.time= Date.now()
    this.connection=connection
    this.giveUp=false
    this.endGame=false
    }
    
    updateTime(){
       this.time = Date.now()
       return true
    }
}

class infTypeStatus{
    constructor(status){
        this.typeStatus = status
    }
}
module.exports = {infGame,infMovement,infPlayer,infTypeStatus}  