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
            this.gameLogic.starObjGame(this.applicationSetup.currentPlayerColor)
            this.applicationSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            this.applicationSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.applicationSetup.currentPlayerColor))
            const isPlayable = false
            this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor, isPlayable)
            this.network.enableCalls.playerConnection()
        }
        else{
            this.viewController.informationProminent(informationConnectionRoom.msg)
        }
    }

    async connectInARoom(nickAndCode){
        const informationConnectionRoom= await this.network.sendServer.connectInARoom(nickAndCode)
        if(informationConnectionRoom.serverConnection){
            this.viewController.hideHomeMenu()
            const connection={
                msg:msgsAndAlerts.connection.connected(informationConnectionRoom.statusPlayerAdv.namePlayer),
                typeGame:"online",
            }
            this.viewController.updateStatusConection(connection)
            this.applicationSetup.addInformationPlayerOnline(nickAndCode.name,this.applicationSetup.colorsGame.top,informationConnectionRoom.statusCodes)
            this.applicationSetup.addNamePlayerAdv(informationConnectionRoom.statusPlayerAdv.namePlayer)
            this.applicationSetup.updateCurrentPlayerColor(this.applicationSetup.colorsGame.top)
            this.applicationSetup.updateTimeConnection()
            this.gameLogic.starObjGame(this.applicationSetup.currentPlayerColor)
            this.applicationSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            this.applicationSetup.addLogGame(msgsAndAlerts.connection.connected(informationConnectionRoom.statusPlayerAdv.namePlayer))
            this.applicationSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.applicationSetup.currentPlayerColor))
            this.applicationSetup.addLogGame(msgsAndAlerts.startGame.startGame())
            const isPlayable = false
            this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor, isPlayable)
            this.network.enableCalls.moveAdversary()
            this.network.enableCalls.statusGame()
        }
        else{
            this.viewController.informationProminent(informationConnectionRoom.msg)
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
            this.applicationSetup.addLogGame(msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer))
            this.applicationSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.applicationSetup.currentPlayerColor))
            this.applicationSetup.addLogGame(msgsAndAlerts.startGame.startGame())
            this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor)
            this.network.enableCalls.statusGame()
        }
    }

    async move(informationPieceSelect){
        // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        const isMove = this.movePiece(informationPieceSelect)
        const nextColor=this.changeNextColor()
        const isPlayable=false
        this.applicationSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(this.applicationSetup.onlineConf.statusPlayers.playerColor,this.applicationSetup.onlineConf.statusPlayers.playerName))
    
        if(isMove){
            const infSendMove = await this.network.sendServer.moveGame(informationPieceSelect)
            if(infSendMove.serverConnection){
                this.network.enableCalls.moveAdversary()
                this.applicationSetup.updateCurrentPlayerColor(nextColor)
                this.applicationSetup.addLogGame(msgsAndAlerts.movement.nextPlayer(this.applicationSetup.currentPlayerColor,this.applicationSetup.onlineConf.statusPlayers.advName))
                this.applicationSetup.addHistoryLocalStorage(informationPieceSelect)
            }
            else{
                this.viewController.informationProminent(informationConnectionRoom.msg)
            }
        }
        else{
            // mandar refazer os movimentos
            this.viewController.informationProminent(msgsAndAlerts.incorrectMovement(this.applicationSetup.currentPlayerColor))
        }
        this.checkEndGame()
        this.updateDisplayGame(this.applicationSetup.colorsGame.top,nextColor,isPlayable)
    }

    getMoveAdv(moveAdv){
        if(moveAdv.move===null){
            this.viewController.displayEndGameInformation(moveAdv.msg)
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
            this.network.sendServer.endGame()
        }
        else{
            const isMove = this.movePiece(moveAdv.move)
            if(isMove){
                const nextColor=this.applicationSetup.onlineConf.statusPlayers.playerColor
                this.applicationSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(this.applicationSetup.currentPlayerColor,this.applicationSetup.onlineConf.statusPlayers.advName))
                this.applicationSetup.updateCurrentPlayerColor(nextColor)
                this.applicationSetup.addLogGame(msgsAndAlerts.movement.nextPlayer(this.applicationSetup.onlineConf.statusPlayers.playerColor,this.applicationSetup.onlineConf.statusPlayers.playerName))
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
            this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor)
        }
    }

    restartGame(){
        if(this.applicationSetup.endGame===false){
            this.network.sendServer.giveUp()
            this.applicationSetup.updateEndGame()
            this.applicationSetup.clearLocalStorage()
        }
        this.applicationSetup.clearGame()
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
        if(this.applicationSetup.endGame===false){
            const displayGiveUp = msgsAndAlerts.endGame.timeOutToMove(playerName)
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
            this.viewController.informationProminent(infConnetion.msg)
        }
    }

    startReconnection(room,playerInformation,plays){
        const connection={
            msg:msgsAndAlerts.connection.connected(room.statusPlayerAdv.namePlayer),
            typeGame:"online",
        }
        this.viewController.updateStatusConection(connection)
        this.applicationSetup.addInformationPlayerOnline(playerInformation.statusPlayers.playerName,playerInformation.statusPlayers.playerColor,playerInformation.statusCode)
        this.applicationSetup.addNamePlayerAdv(playerInformation.statusPlayers.advName)
        this.applicationSetup.updateCurrentPlayerColor(this.applicationSetup.colorsGame.bottom)
        this.applicationSetup.updateTimeConnection()
        this.gameLogic.starObjGame(this.applicationSetup.currentPlayerColor)
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
        const isPlayable = (this.applicationSetup.onlineConf.statusPlayers.playerColor===this.applicationSetup.currentPlayerColor)?true:false
        this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor,isPlayable)
        return isPlayable

    }
}