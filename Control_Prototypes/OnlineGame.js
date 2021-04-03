import msgsAndAlerts from "../MsgsAndAlerts.js"
import GenericGame from "./GenericGame.js"

export default class OnlineGame extends GenericGame{
    constructor(game,gameSetup,viewController,network){
        super(game,gameSetup,viewController)
        this.game=game
        this.gameSetup=gameSetup
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
            this.gameSetup.addInformationPlayerOnline(nickAndCode.name,this.gameSetup.colorsGame.bottom)
            this.gameSetup.updateCurrentPlayerColor(this.gameSetup.colorsGame.bottom)
            this.game.starObjGame(this.gameSetup.currentPlayerColor)
            this.gameSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            this.gameSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.gameSetup.currentPlayerColor))
            const isPlayable = false
            this.updateDisplayGame(this.gameSetup.colorsGame.top,this.gameSetup.currentPlayerColor, isPlayable)
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
            this.gameSetup.addInformationPlayerOnline(nickAndCode.name,this.gameSetup.colorsGame.top)
            this.gameSetup.addNamePlayerAdv(nickAndCode.name)
            this.gameSetup.updateCurrentPlayerColor(this.gameSetup.colorsGame.top)
            this.game.starObjGame(this.gameSetup.currentPlayerColor)
            this.gameSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            this.gameSetup.addLogGame(msgsAndAlerts.connection.connected(informationConnectionRoom.statusPlayerAdv.namePlayer))
            this.gameSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.gameSetup.currentPlayerColor))
            this.gameSetup.addLogGame(msgsAndAlerts.startGame.startGame())
            const isPlayable = false
            this.updateDisplayGame(this.gameSetup.colorsGame.top,this.gameSetup.currentPlayerColor, isPlayable)
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
            this.gameSetup.addLogGame(statusPlayerAdv.msg)
            this.updateDisplayLog()
        }
        else{
            this.gameSetup.addNamePlayerAdv(statusPlayerAdv.namePlayer)
            const connection={
                msg:msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer),
                typeGame:"online",
            }
            this.viewController.updateStatusConection(connection)
            this.gameSetup.addLogGame(msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer))
            this.gameSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(this.gameSetup.currentPlayerColor))
            this.gameSetup.addLogGame(msgsAndAlerts.startGame.startGame())
            this.updateDisplayGame(this.gameSetup.colorsGame.top,this.gameSetup.currentPlayerColor)
            this.network.enableCalls.statusGame()
        }
    }

    async move(informationPieceSelect){
        // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        const isMove = this.movePiece(informationPieceSelect)
        const nextColor=(this.gameSetup.colorsGame.top===this.gameSetup.currentPlayerColor)?this.gameSetup.colorsGame.bottom:this.gameSetup.colorsGame.top
        const isPlayable=false
        this.gameSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(this.gameSetup.onlineConf.playerColor,this.gameSetup.onlineConf.playerName))
    
        if(isMove){
            const infSendMove = await this.network.sendServer.moveGame(informationPieceSelect)
            if(infSendMove.serverConnection){
                this.network.enableCalls.moveAdversary()
                this.gameSetup.updateCurrentPlayerColor(nextColor)
                this.gameSetup.addLogGame(msgsAndAlerts.movement.nextPlayer(this.gameSetup.currentPlayerColor,this.gameSetup.onlineConf.advName))
            }
            else{
                this.viewController.informationProminent(informationConnectionRoom.msg)
            }
        }
        else{
            this.viewController.informationProminent(msgsAndAlerts.incorrectMovement(this.gameSetup.currentPlayerColor))
        }
        
        this.updateDisplayGame(this.gameSetup.colorsGame.top,nextColor,isPlayable)
    }

    getMoveAdv(moveAdv){
        if(moveAdv.move===null){
            this.viewController.displayEndGameInformation(moveAdv.msg)
            this.gameSetup.updateEndGame()
            this.network.sendServer.endGame()
        }
        else{
            const isMove = this.movePiece(moveAdv.move)
            if(isMove){
                const nextColor=this.gameSetup.onlineConf.playerColor
                this.gameSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(this.gameSetup.currentPlayerColor,this.gameSetup.onlineConf.advName))
                this.gameSetup.updateCurrentPlayerColor(nextColor)
                this.gameSetup.addLogGame(msgsAndAlerts.movement.nextPlayer(this.gameSetup.onlineConf.playerColor,this.gameSetup.onlineConf.playerName))
            }
            else{
                const incorrectMovement = msgsAndAlerts.movement.cheatMovement()
                this.gameSetup.addLogGame(incorrectMovement)
                this.viewController.displayEndGameInformation(incorrectMovement)
                this.network.sendServer.incorrectMovement()
                this.gameSetup.updateEndGame()
                this.network.sendServer.endGame()
            }
            this.updateDisplayGame(this.gameSetup.colorsGame.top,this.gameSetup.currentPlayerColor)
        }
    }

    restartGame(){
        if(this.gameSetup.endGame===false){
            this.network.sendServer.giveUp()
        }
        this.gameSetup.clearGame()
        this.viewController.hideEndGameInformation()
        this.viewController.hideBackMovement()
        this.viewController.displayHomeMenu()
    }

    advGiveUp(){
        if(this.gameSetup.endGame===false){
            const displayGiveUp = msgsAndAlerts.giveUp.giveUpPlayer(this.gameSetup.onlineConf.advName)
            this.viewController.displayEndGameInformation(displayGiveUp)
            this.gameSetup.updateEndGame()
            this.network.sendServer.endGame()
        }
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = this.game.getStatusGame() 
        if(statusGame.draw===true){
            this.gameSetup.updateEndGame()
            const displayDraw=msgsAndAlerts.drawGame.draw()
            this.viewController.displayEndGameInformation(displayDraw)
            this.gameSetup.addLogGame(displayDraw)
            this.updateDisplayLog()
            this.network.sendServer.endGame()
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            this.gameSetup.updateEndGame()
            const nameWin = (statusGame.winColor===this.gameSetup.onlineConf.color)?this.gameSetup.onlineConf.playerName:this.gameSetup.onlineConf.advName
            const displayEndGame=msgsAndAlerts.endGame.winPlayer(nameWin)
            this.viewController.displayEndGameInformation(displayEndGame)
            this.gameSetup.addLogGame(displayEndGame)
            this.updateDisplayLog()
            this.network.sendServer.endGame()
        }
    }

    informationProminentErr(infConnetion){
        if(infConnetion.serverConnection === false){
            this.viewController.informationProminent(infConnetion.msg)
        }
    }
}
