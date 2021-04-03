import msgsAndAlerts from "../MsgsAndAlerts.js"
import GenericGame from "./GenericGame.js"

export default class OfflineGame extends GenericGame{
    constructor(game,gameSetup,viewController){
        super(game,gameSetup,viewController)
        this.game=game
        this.gameSetup=gameSetup
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
        this.gameSetup.updateCurrentPlayerColor(this.gameSetup.colorsGame.bottom)
        this.game.starObjGame(this.gameSetup.currentPlayerColor)
        this.gameSetup.addLogGame(msgsAndAlerts.startGame.startGame())
        this.updateDisplayGame(this.gameSetup.colorsGame.top,this.gameSetup.currentPlayerColor)
    }

    move(informationPieceSelect){
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
            const nextColor=(this.gameSetup.colorsGame.top===this.gameSetup.currentPlayerColor)?this.gameSetup.colorsGame.bottom:this.gameSetup.colorsGame.top
            this.gameSetup.addLogGame(msgsAndAlerts.movement.movementPiece(this.gameSetup.currentPlayerColor))
            this.gameSetup.updateCurrentPlayerColor(nextColor)
            this.gameSetup.addLogGame(msgsAndAlerts.movement.nextColor(this.gameSetup.currentPlayerColor))
        }
        this.updateDisplayGame(this.gameSetup.colorsGame.top,this.gameSetup.currentPlayerColor)
    }

    backPreviousMove(){
        this.viewController.hideEndGameInformation()
        const playHistory = this.game.getHistoryMoves()
        if(playHistory.length>0){
            this.game.returnMovement()
            const pastColor=(this.gameSetup.colorsGame.top===this.gameSetup.currentPlayerColor)?this.gameSetup.colorsGame.bottom:this.gameSetup.colorsGame.top
            const statusGame = this.game.getStatusGame() 
            if(statusGame.endGame===false){
                this.gameSetup.addLogGame(msgsAndAlerts.movement.return(this.gameSetup.currentPlayerColor))
                this.gameSetup.updateCurrentPlayerColor(pastColor)
                this.gameSetup.addLogGame(msgsAndAlerts.movement.nextColor(this.gameSetup.currentPlayerColor))
                this.updateDisplayGame(this.gameSetup.colorsGame.top,pastColor)
            }
        }
    }

    restartGame(){
        this.gameSetup.clearGame()
        this.viewController.hideEndGameInformation()
        this.viewController.hideBackMovement()
        this.viewController.displayHomeMenu()
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = this.game.getStatusGame() 
        if(statusGame.draw===true){
            const displayDraw=msgsAndAlerts.drawGame.draw()
            this.viewController.displayEndGameInformation(displayDraw)
            this.gameSetup.addLogGame(displayDraw)
            this.updateDisplayLog()
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            const displayEndGame=msgsAndAlerts.endGame.winPiece(statusGame.winColor)
            this.viewController.displayEndGameInformation(displayEndGame)
            this.updateDisplayLog()
        }
    }
}