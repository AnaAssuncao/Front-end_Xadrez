import msgsAndAlerts from "../MsgsAndAlerts.js"
export default class ApplicationSetup{
    constructor(){
        this.gameMode=null
        this.colorsGame={   
            top:"black", 
            bottom:"white", 
        }
        this.currentPlayerColor=null
        this.onlineConf={
            timeConnection:null,
            statusPlayers:{
                playerColor:null,
                playerName:null,
                advName:null
            },
            statusCode:null,
        }
        this.historyMovements=[]
        this.gameLogs=[]
        this.endGame=false
        this.limitTime={
            connection:5000
        }
        this.referenceTimes={
            gameTime:0,
            movementTime:0
        }
    }
    updateCurrentPlayerColor(color){
        this.currentPlayerColor=color
    }
    addGame(game){
        this.gameMode=game
        this.endGame=false
    }
    updateEndGame(){
        this.endGame=true
    }
    addInformationPlayerOnline(playerName,playerColor,statusCode){
        this.onlineConf.statusPlayers.playerColor=playerColor
        this.onlineConf.statusPlayers.playerName=playerName
        this.onlineConf.statusCode=statusCode
        this.onlineConf.timeConnection=Date.now()
    }
    updateTimeConnection(){
        setTimeout(()=>{
            if(this.endGame===false){
                this.onlineConf.timeConnection=Date.now()
                this.addPlayerLocalStorage()
                this.updateTimeConnection()
            }
        },1000)
    }
    addNamePlayerAdv(advName){
        this.onlineConf.statusPlayers.advName=advName
    }
    addLogGame(information){
        const displayLog = msgsAndAlerts.log.gamelog(information)
        this.gameLogs.push(displayLog)
    }
    clearGame(){
        this.gameMode=null
        this.currentPlayerColor=null
        this.onlineConf.statusPlayers.playerColor=null
        this.onlineConf.statusPlayers.playerName=null
        this.onlineConf.statusPlayers.advName=null
        this.gameLogs=[]
    }
    startGameTimer(delayTime=0){
        this.referenceTimes.gameTime=Date.now()-delayTime   
        this.referenceTimes.movementTime=Date.now()-delayTime
        this.addTimesLocalStorage()
    }
    updateMovement(){
        this.referenceTimes.movementTime=Date.now()
        this.addTimesLocalStorage()
    }
    updateReferenceTime(referencetimes){
        const delayTime = 1000
        this.referenceTimes.gameTime=referencetimes.gameTime - delayTime
        this.referenceTimes.movementTime=referencetimes.movementTime - delayTime
    }
    addTimesLocalStorage(){
        localStorage.setItem("timesGame", JSON.stringify(this.referenceTimes))
    }
    addPlayerLocalStorage(){
        localStorage.setItem("playerInformation", JSON.stringify(this.onlineConf))
    }
    addHistoryLocalStorage(movement){
        this.historyMovements.push(movement)
        localStorage.setItem("historyPlayer", JSON.stringify(this.historyMovements))
    }
    clearLocalStorage(){
        this.historyMovements=[]
        localStorage.clear()
    }
}

 