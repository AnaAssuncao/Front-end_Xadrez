import msgsAndAlerts from "../MsgsAndAlerts.js"
export default class GameSetup{
    constructor(){
        this.game=null
        this.colorsGame={   
            top:"Black", 
            bottom:"White", 
        }
        this.currentPlayerColor=null
        this.onlineConf={
            playerColor:null,
            playerName:null,
            advName:null
        }
        this.gameLogs=[]
        this.endGame=false
    }
    updateCurrentPlayerColor(color){
        this.currentPlayerColor=color
    }
    addGame(game){
        this.game=game
        this.endGame=false
    }
    updateEndGame(){
        this.endGame=true
    }
    addInformationPlayerOnline(playerName,playerColor){
        this.onlineConf.playerColor=playerColor
        this.onlineConf.playerName=playerName
    }
    addNamePlayerAdv(advName){
        this.onlineConf.advName=advName
    }
    addLogGame(information){
        const displayLog = msgsAndAlerts.log.gamelog(information)
        this.gameLogs.push(displayLog)
    }
    clearGame(){
        this.game=null
        this.currentPlayerColor=null
        this.onlineConf.playerColor=null
        this.onlineConf.playerName=null
        this.onlineConf.advName=null
        this.gameLogs=[]
    }
}

 