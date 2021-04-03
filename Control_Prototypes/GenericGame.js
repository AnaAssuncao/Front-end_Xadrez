import msgsAndAlerts from "../MsgsAndAlerts.js"
export default class GenericGame{
    constructor(game,gameSetup,viewController){
        this.game=game
        this.gameSetup=gameSetup
        this.viewController=viewController
    }

    updateDisplayGame(colorTop,colorPlayer, isPlayable){
        const statusGame = this.game.getStatusGame() 
        if(statusGame.endGame){
            isPlayable=false
        }
        this.updateDisplayBoard(colorPlayer,isPlayable) 
        this.updateDisplayStatusCheck(colorPlayer)
        this.updateDisplayCapturedPieces(colorTop)
        this.updateDisplayHistory() 
        this.updateDisplayDrawAndEndGame()
        this.updateDisplayLog()   
    }
    
    movePiece(informationPieceSelect){
        let isMove = false
        if(informationPieceSelect.specialMovement){
            isMove=this.game.informSpecialMovement(informationPieceSelect)
        }
        else{
            isMove=this.game.informMove(informationPieceSelect) 
        }  
        return isMove
    }
    
    updateDisplayBoard(colorPlayer,isPlayable=true){
        const chessBoard=this.game.getCurrentBoard()
        this.viewController.updateBoard(chessBoard,colorPlayer,isPlayable) 
    }
    
    updateDisplayStatusCheck(colorPlayer){  
        const statusGame = this.game.getStatusGame() 
        if(statusGame.checkMate===true){
            this.viewController.updateStatusCheck(msgsAndAlerts.checksPiece.checkMate(colorPlayer))   
            this.gameSetup.addLogGame(msgsAndAlerts.checksPiece.checkMate(colorPlayer)) 
        }  
        else if(statusGame.check===true){
            this.viewController.updateStatusCheck(msgsAndAlerts.checksPiece.check(colorPlayer))
            this.gameSetup.addLogGame(msgsAndAlerts.checksPiece.check(colorPlayer)) 
        }
        else{
            this.viewController.updateStatusCheck(msgsAndAlerts.checksPiece.noCheck())
        }
    }
    
    updateDisplayCapturedPieces(colorTop){
        const capturedPieces = this.game.getCapturedPieces()
        this.viewController.updateCapturedPieces(colorTop,capturedPieces)
    }
    
    updateDisplayHistory(){
        const playHistory = this.game.getHistoryMoves()
        this.viewController.updateHistory(playHistory)
    }

    updateDisplayLog(){
        this.viewController.displayGameLog(this.gameSetup.gameLogs)
    }
}