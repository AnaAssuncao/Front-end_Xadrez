import msgsAndAlerts from "../MsgsAndAlerts.js"
export default class GenericGame{
    #timeLimit={
        movement:300000, //5 min,
        timeoutMovement:0,
        timeWarning:10,
    }
    constructor(gameLogic,applicationSetup,viewController){
        this.gameLogic=gameLogic
        this.applicationSetup=applicationSetup
        this.viewController=viewController
    }

    updateDisplayGame(colorTop,colorPlayer, isPlayable){
        const statusGame = this.gameLogic.getStatusGame() 
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
            isMove=this.gameLogic.informSpecialMovement(informationPieceSelect)
        }
        else{
            isMove=this.gameLogic.informMove(informationPieceSelect) 
        }  
        return isMove
    }
    
    updateDisplayBoard(colorPlayer,isPlayable=true){
        const chessBoard=this.gameLogic.getCurrentBoard()
        const informationColor = msgsAndAlerts.movement.nextColor(colorPlayer)
        this.viewController.updateBoard(chessBoard,colorPlayer,isPlayable,informationColor) 
    }
    
    updateDisplayStatusCheck(colorPlayer){  
        const statusGame = this.gameLogic.getStatusGame() 
        if(statusGame.checkMate===true){
            this.viewController.updateStatusCheck(msgsAndAlerts.checksPiece.checkMate(colorPlayer))   
            this.applicationSetup.addLogGame(msgsAndAlerts.checksPiece.checkMate(colorPlayer)) 
        }  
        else if(statusGame.check===true){
            this.viewController.updateStatusCheck(msgsAndAlerts.checksPiece.check(colorPlayer))
            this.applicationSetup.addLogGame(msgsAndAlerts.checksPiece.check(colorPlayer)) 
        }
        else{
            this.viewController.updateStatusCheck(msgsAndAlerts.checksPiece.noCheck())
        }
    }
    
    updateDisplayCapturedPieces(colorTop){
        const capturedPieces = this.gameLogic.getCapturedPieces()
        this.viewController.updateCapturedPieces(colorTop,capturedPieces)
    }
    
    updateDisplayHistory(){
        const playHistory = this.gameLogic.getHistoryMoves()
        this.viewController.updateHistory(playHistory)
    }

    updateDisplayLog(){
        this.viewController.displayGameLog(this.applicationSetup.gameLogs)
    }

    changeNextColor(){
        const nextColor=(this.applicationSetup.colorsGame.top===this.applicationSetup.currentPlayerColor)?
                            this.applicationSetup.colorsGame.bottom:this.applicationSetup.colorsGame.top
        return nextColor
    }

    countGameTime(){
        setTimeout(()=>{
            if(this.applicationSetup.endGame===false){
                const timeNow =Date.now()
                const timeDifference = timeNow - this.applicationSetup.referenceTimes.gameTime
                const date = new Date(0, 0, 0, 0, 0, 0, timeDifference)
                const options = {
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: false,
                }
                const newTime = new Intl.DateTimeFormat('pt-BR', options).format(date)
                this.viewController.displayUpdateGameTime(newTime)
                this.countGameTime()
            }
        },1000)
    }

    countMovementTime(){
        setTimeout(()=>{
            if(this.applicationSetup.endGame===false){
                const timeLimit = this.applicationSetup.referenceTimes.movementTime + this.#timeLimit.movement //5 min
                const timeNow =Date.now()
                const timeDifference = timeLimit - timeNow
                if(timeDifference>this.#timeLimit.timeoutMovement){
                    const date = new Date(0, 0, 0, 0, 0, 0, timeDifference)
                    const options = {
                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                        hour12: false,
                    }
                    const newTime=new Intl.DateTimeFormat('pt-BR', options).format(date)
                    this.viewController.displayUpdateMovementTime(newTime)
                    this.countMovementTime()
                }
                else{
                    setTimeout(()=>{this.timeOutToMove(true)},1000)
                }
            }
        },1000)
    }
}