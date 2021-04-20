import msgsAndAlerts from "../MsgsAndAlerts.js"
import GenericGame from "./GenericGame.js"

export default class OfflineGame extends GenericGame{
    constructor(gameLogic,applicationSetup,viewController){
        super(gameLogic,applicationSetup,viewController)
        this.gameLogic=gameLogic
        this.applicationSetup=applicationSetup
        this.viewController=viewController
    }
    start(){
        this.viewController.hideHomeMenu()
        const connection={
            msg:msgsAndAlerts.connection.place(),
            typeGame:"offline",
        }
        this.viewController.updateStatusConection(connection)
        this.viewController.displayBackMovement()
        this.applicationSetup.updateCurrentPlayerColor(this.applicationSetup.colorsGame.bottom)
        this.gameLogic.starObjGame(this.applicationSetup.currentPlayerColor)
        this.applicationSetup.addLogGame(msgsAndAlerts.startGame.startGame())
        this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor)
    }

    move(informationPieceSelect){
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
            const nextColor=(this.applicationSetup.colorsGame.top===this.applicationSetup.currentPlayerColor)?this.applicationSetup.colorsGame.bottom:this.applicationSetup.colorsGame.top
            this.applicationSetup.addLogGame(msgsAndAlerts.movement.movementPiece(this.applicationSetup.currentPlayerColor))
            this.applicationSetup.updateCurrentPlayerColor(nextColor)
            this.applicationSetup.addLogGame(msgsAndAlerts.movement.nextColor(this.applicationSetup.currentPlayerColor))
        }
        this.updateDisplayGame(this.applicationSetup.colorsGame.top,this.applicationSetup.currentPlayerColor)
    }

    backPreviousMove(){
        this.viewController.hideEndGameInformation()
        const playHistory = this.gameLogic.getHistoryMoves()
        if(playHistory.length>0){
            this.gameLogic.returnMovement()
            const pastColor=(this.applicationSetup.colorsGame.top===this.applicationSetup.currentPlayerColor)?this.applicationSetup.colorsGame.bottom:this.applicationSetup.colorsGame.top
            const statusGame = this.gameLogic.getStatusGame() 
            if(statusGame.endGame===false){
                this.applicationSetup.addLogGame(msgsAndAlerts.movement.return(this.applicationSetup.currentPlayerColor))
                this.applicationSetup.updateCurrentPlayerColor(pastColor)
                this.applicationSetup.addLogGame(msgsAndAlerts.movement.nextColor(this.applicationSetup.currentPlayerColor))
                this.updateDisplayGame(this.applicationSetup.colorsGame.top,pastColor)
            }
        }
    }

    restartGame(){
        this.applicationSetup.clearGame()
        this.viewController.hideEndGameInformation()
        this.viewController.hideBackMovement()
        this.viewController.displayHomeMenu()
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = this.gameLogic.getStatusGame() 
        if(statusGame.draw===true){
            const displayDraw=msgsAndAlerts.drawGame.draw()
            this.viewController.displayEndGameInformation(displayDraw)
            this.applicationSetup.addLogGame(displayDraw)
            this.updateDisplayLog()
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            const displayEndGame=msgsAndAlerts.endGame.winPiece(statusGame.winColor)
            this.viewController.displayEndGameInformation(displayEndGame)
            this.updateDisplayLog()
        }
    }
}