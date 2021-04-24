import msgsAndAlerts from "../MsgsAndAlerts.js"
import GenericGame from "./GenericGame.js"

export default class OnlineGame extends GenericGame{
    constructor(gameLogic,applicationSetup,viewController,network){
        super(gameLogic,applicationSetup,viewController)
        this.gameLogic=gameLogic
        this.applicationSetup=applicationSetup
        this.viewController=viewController
        this.network=network
    }
    
    async startNewRoom(nickAndCode){
        // nickAndCode = {name:value, roomCode:value}
        try{
            const informationConnectionRoom= await this.network.sendServer.startNewRoom(nickAndCode)
            if(informationConnectionRoom.serverConnection){
                this.viewController.hideHomeMenu()
                const connection={
                    msg:msgsAndAlerts.connection.waitAdv(),
                    typeGame:"online",
                }
                this.viewController.updateStatusConection(connection)
                this.applicationSetup.addInformationPlayerOnline(nickAndCode.name,this.applicationSetup.colorsGame.bottom,informationConnectionRoom.statusCodes)
                this.applicationSetup.updateCurrentPlayerColor(this.applicationSetup.colorsGame.bottom)
                this.gameLogic.starObjGame(this.applicationSetup.colorsGame.bottom)
                this.applicationSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
                this.applicationSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.applicationSetup.currentPlayerColor))
                const isYourTurn = false
                this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor,connection.msg, isYourTurn)
                this.network.enableCalls.playerConnection()
            }
            else{
                this.viewController.informationProminent(informationConnectionRoom.msg)
            }
        }
        catch{
            this.viewController.informationProminent("catch")
        }
    }

    async connectInARoom(nickAndCode){
        try{
            const startTime = Date.now()
            const informationConnectionRoom= await this.network.sendServer.connectInARoom(nickAndCode,startTime)
            if(informationConnectionRoom.serverConnection){
                this.viewController.hideHomeMenu()
                const connection={
                    msg:msgsAndAlerts.connection.connected(informationConnectionRoom.statusPlayerAdv.namePlayer),
                    typeGame:"online",
                }
                this.viewController.updateStatusConection(connection)
                this.applicationSetup.addInformationPlayerOnline(nickAndCode.name,this.applicationSetup.colorsGame.top,informationConnectionRoom.statusCodes)
                this.applicationSetup.addNamePlayerAdv(informationConnectionRoom.statusPlayerAdv.namePlayer)
                this.applicationSetup.updateCurrentPlayerColor(this.applicationSetup.colorsGame.bottom)
                this.applicationSetup.updateTimeConnection()
                this.applicationSetup.startGameTimer(startTime)
                this.countGameTime()
                this.countMovementTime()
                this.gameLogic.starObjGame(this.applicationSetup.colorsGame.top)
                this.applicationSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
                this.applicationSetup.addLogGame(msgsAndAlerts.log.connected(informationConnectionRoom.statusPlayerAdv.namePlayer))
                this.applicationSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.applicationSetup.currentPlayerColor))
                this.applicationSetup.addLogGame(msgsAndAlerts.startGame.startGame())
                const isYourTurn = false
                const msgCurrentPlayer = msgsAndAlerts.movement.nextPlayer(this.currentPlayerName())
                this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor,msgCurrentPlayer, isYourTurn)
                this.network.enableCalls.moveAdversary()
                this.network.enableCalls.statusGame()
            }
            else{
                this.viewController.informationProminent(informationConnectionRoom.msg)
            }
        }
        catch{
            this.viewController.informationProminent("catch")
        }
    }
    
    connectionPlayerTwo(statusPlayerAdv){
        if(statusPlayerAdv.isAdvConnected===false){
            this.viewController.displayEndGameInformation(statusPlayerAdv.msg)
            this.applicationSetup.addLogGame(statusPlayerAdv.msg)
            this.updateDisplayLog()
        }
        else{
            this.applicationSetup.addNamePlayerAdv(statusPlayerAdv.namePlayer)
            this.applicationSetup.updateTimeConnection()
            const connection={
                msg:msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer),
                typeGame:"online",
            }
            this.viewController.updateStatusConection(connection)
            this.applicationSetup.startGameTimer(statusPlayerAdv.startTime)
            this.countGameTime()
            this.countMovementTime()
            this.applicationSetup.addLogGame(msgsAndAlerts.log.connected(statusPlayerAdv.namePlayer))
            this.applicationSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.applicationSetup.currentPlayerColor))
            this.applicationSetup.addLogGame(msgsAndAlerts.startGame.startGame())
            const msgCurrentPlayer = msgsAndAlerts.movement.yourTurn(this.currentPlayerName())
            this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor,msgCurrentPlayer)
            this.network.enableCalls.statusGame()
            const isYourTurn = true
            this.viewController.updateDisplayYourTurn(isYourTurn)
        }
    }

    async move(informationPieceSelect){
        // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        const isMove = this.movePiece(informationPieceSelect)
        const nextColor=this.changeNextColor()
        this.applicationSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(this.applicationSetup.onlineConf.statusPlayers.playerColor,this.applicationSetup.onlineConf.statusPlayers.playerName))
    
        if(isMove){
            try{
                const movementTime = Date.now()
                const infSendMove = await this.network.sendServer.moveGame(informationPieceSelect,movementTime)
                if(infSendMove.serverConnection){
                    this.network.enableCalls.moveAdversary()
                    this.applicationSetup.updateCurrentPlayerColor(nextColor)
                    this.applicationSetup.updateMovement(movementTime)
                    this.applicationSetup.addLogGame(msgsAndAlerts.movement.nextColorAndPlayer(this.applicationSetup.currentPlayerColor,this.applicationSetup.onlineConf.statusPlayers.advName))
                    this.applicationSetup.addHistoryLocalStorage(informationPieceSelect)
                }
            }
            catch{
                this.viewController.informationProminent("catch")
            }
        }
        else{
            this.viewController.informationProminent(msgsAndAlerts.movement.moveAgain())      
        }
        this.checkEndGame()
        const msgCurrentPlayer = msgsAndAlerts.movement.nextPlayer(this.currentPlayerName())
        const isYourTurn=false
        this.updateDisplayGame(this.applicationSetup.colorsGame.top,nextColor,msgCurrentPlayer,isYourTurn)
        this.viewController.updateDisplayYourTurn(isYourTurn)
    }

    getMoveAdv(moveAdv){
        if(moveAdv.serverConnection===false){
            this.viewController.displayEndGameInformation(moveAdv.msg)
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
            this.network.sendServer.endGame()
        }
        else if(moveAdv.move===null){ // when it is not once
            this.viewController.informationProminent(moveAdv.msg)
        }
        else{
            const isMove = this.movePiece(moveAdv.move)
            if(isMove){
                const nextColor=this.applicationSetup.onlineConf.statusPlayers.playerColor
                this.applicationSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(this.applicationSetup.currentPlayerColor,this.applicationSetup.onlineConf.statusPlayers.advName))
                this.applicationSetup.updateCurrentPlayerColor(nextColor)
                this.applicationSetup.updateMovement(moveAdv.movementTime)
                this.applicationSetup.addLogGame(msgsAndAlerts.movement.nextColorAndPlayer(this.applicationSetup.onlineConf.statusPlayers.playerColor,this.applicationSetup.onlineConf.statusPlayers.playerName))
                this.applicationSetup.addHistoryLocalStorage(moveAdv.move)
            }
            else{
                const incorrectMovement = msgsAndAlerts.movement.cheatMovement()
                this.applicationSetup.addLogGame(incorrectMovement)
                this.applicationSetup.updateEndGame()
                this.viewController.displayEndGameInformation(incorrectMovement)
                this.network.sendServer.incorrectMovement()
                this.applicationSetup.clearLocalStorage()
                this.network.sendServer.endGame()
            }
            this.checkEndGame()
            const msgCurrentPlayer = msgsAndAlerts.movement.yourTurn(this.currentPlayerName())
            this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor,msgCurrentPlayer)
            const isYourTurn = true
            this.viewController.updateDisplayYourTurn(isYourTurn)
        }
    }

    restartGame(){
        if(this.applicationSetup.endGame===false){
            this.network.sendServer.giveUp()
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
        }
        this.applicationSetup.clearGame()
        const isYourTurn = false
        this.viewController.updateDisplayYourTurn(isYourTurn)
        this.viewController.clearTimes()
        this.viewController.hideEndGameInformation()
        this.viewController.hideBackMovement()
        this.viewController.displayHomeMenu()   
    }

    advGiveUp(){
        if(this.applicationSetup.endGame===false){
            const displayGiveUp = msgsAndAlerts.endGame.giveUpPlayer(this.applicationSetup.onlineConf.statusPlayers.advName)
            this.viewController.displayEndGameInformation(displayGiveUp)
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
            this.network.sendServer.endGame()
        }
    }

    timeOutToMove(playerName){
        if(playerName){
            playerName = this.currentPlayerName()
        }
        if(this.applicationSetup.endGame===false){
            const displayGiveUp = msgsAndAlerts.endGame.timeOutToMovePlayer(playerName)
            this.viewController.displayEndGameInformation(displayGiveUp)
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
            this.network.sendServer.endGame()
        }
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = this.gameLogic.getStatusGame() 
        if(statusGame.draw===true){
            const displayDraw=msgsAndAlerts.endGame.draw()
            this.viewController.displayEndGameInformation(displayDraw)
            this.applicationSetup.addLogGame(displayDraw)
            this.updateDisplayLog()
        }
        else if(statusGame.winColor){
            const nameWin = (statusGame.winColor===this.applicationSetup.onlineConf.statusPlayers.playerColor)?this.applicationSetup.onlineConf.statusPlayers.playerName:this.applicationSetup.onlineConf.statusPlayers.advName
            const displayEndGame=msgsAndAlerts.endGame.winPlayer(nameWin)
            this.viewController.displayEndGameInformation(displayEndGame)
            this.applicationSetup.addLogGame(displayEndGame)
            this.updateDisplayLog()
        }
    }

    checkEndGame(){
        const statusGame = this.gameLogic.getStatusGame() 
        if(statusGame.winColor===true){
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
            this.network.sendServer.playerWin()
        }
        else if(statusGame.endGame===true){
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
            this.network.sendServer.endGame()
        }
    }

    informationProminentErr(infConnetion){
        if(infConnetion.serverConnection === false){
            this.viewController.displayBannerGame(msgsAndAlerts.connection.errServer())
        }
    }

    startReconnection(room,playerInformation,plays,referencetimes){
        const connection={
            msg:msgsAndAlerts.connection.connected(room.statusPlayerAdv.namePlayer),
            typeGame:"online",
        }
        this.viewController.updateStatusConection(connection)
        this.applicationSetup.addInformationPlayerOnline(playerInformation.statusPlayers.playerName,playerInformation.statusPlayers.playerColor,playerInformation.statusCode)
        this.applicationSetup.addNamePlayerAdv(playerInformation.statusPlayers.advName)
        this.applicationSetup.updateCurrentPlayerColor(this.applicationSetup.colorsGame.bottom)
        this.applicationSetup.updateTimeConnection()
        this.applicationSetup.updateReferenceTime(referencetimes)
        this.countGameTime()
        this.countMovementTime()
        this.gameLogic.starObjGame(playerInformation.statusPlayers.playerColor)
        this.applicationSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(playerInformation.statusCode.roomCode))
        this.applicationSetup.addLogGame(msgsAndAlerts.connection.connected(room.statusPlayerAdv.namePlayer))
        this.applicationSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.applicationSetup.currentPlayerColor))
        this.applicationSetup.addLogGame(msgsAndAlerts.startGame.startGame())
        const isCurrentPlayer=this.redoMovements(plays)
        this.applicationSetup.addLogGame(msgsAndAlerts.roomAndCode.reconnectRoom())
        this.network.enableCalls.statusGame()
        if(isCurrentPlayer===false){
            this.network.enableCalls.moveAdversary()
        }
    }

    redoMovements(plays){
        if(plays){
            plays.forEach((informationPieceSelect)=>{  
                const isMove =this.movePiece(informationPieceSelect)
                if(isMove){
                    const nextColor=this.changeNextColor()
                    this.applicationSetup.addLogGame(msgsAndAlerts.movement.movementPiece(this.applicationSetup.currentPlayerColor))
                    this.applicationSetup.updateCurrentPlayerColor(nextColor)
                    this.applicationSetup.addLogGame(msgsAndAlerts.movement.nextColor(this.applicationSetup.currentPlayerColor))
                    this.applicationSetup.addHistoryLocalStorage(informationPieceSelect)
                }
            })
        }
        const isYourTurn = (this.applicationSetup.onlineConf.statusPlayers.playerColor===this.applicationSetup.currentPlayerColor)?true:false
        const msgCurrentPlayer = msgsAndAlerts.movement.nextPlayer(this.currentPlayerName())
        this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor,msgCurrentPlayer,isYourTurn)
        return isYourTurn
    }

    currentPlayerName(){
        const playerName = (this.applicationSetup.currentPlayerColor===this.applicationSetup.onlineConf.statusPlayers.playerColor)?
                        this.applicationSetup.onlineConf.statusPlayers.playerName:this.applicationSetup.onlineConf.statusPlayers.advName
        return playerName
    }
}