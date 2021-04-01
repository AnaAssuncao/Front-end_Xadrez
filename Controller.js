import CreateGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import InterfaceNetwork from "./Network/Network.js"
import msgsAndAlerts from "./MsgsAndAlerts.js"

class GameSetup{
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

const gameSetup = new GameSetup()
let game = new CreateGame(gameSetup.colorsGame)
const startBoard = game.getCurrentBoard()

const viewController = new ViewController (startBoard)
const network = new InterfaceNetwork()

const interfaceFunctions={ 
    startGameOffline:function(){
        gameSetup.addGame(new OfflineGame())
        gameSetup.game.start()
    },  
    startNewRoomOnline:function(nickAndCode){
        gameSetup.addGame(new OnlineGame())
        gameSetup.game.startNewRoom(nickAndCode)
    },
    connectInARoomOnline:function(nickAndCode){
        gameSetup.addGame(new OnlineGame())
        gameSetup.game.connectInARoom(nickAndCode)
    },
    restartGame:function(){
        gameSetup.game.restartGame()
    },
    move:function(informationPieceSelect){
        gameSetup.game.move(informationPieceSelect)
    },
    backPreviousMove:function(){
        gameSetup.game.backPreviousMove()
    },
    moveAdv:function(infMoveAdv){
        gameSetup.game.getMoveAdv(infMoveAdv)
    },
    playerConnection:function(infPlayerAdv){
        gameSetup.game.connectionPlayerTwo(infPlayerAdv)
    },
    giveUp:function(infPlayerAdv){
        gameSetup.game.advGiveUp(infPlayerAdv)
    },
    errConnection(msgErr){
        gameSetup.game.informationProminentErr(msgErr)
    }
}

viewController.displayHomeMenu()
viewController.subscribeStartGameOffline(interfaceFunctions.startGameOffline)
viewController.subscribeStartNewRoomOnline(interfaceFunctions.startNewRoomOnline)
viewController.subscribeConnectInARoomOnline(interfaceFunctions.connectInARoomOnline)
viewController.subscribeMovePiece(interfaceFunctions.move)
viewController.subscribeHistory(interfaceFunctions.backPreviousMove)
viewController.subscribeRestartGame(interfaceFunctions.restartGame)
network.subscribeMoveAdversary(interfaceFunctions.moveAdv)
network.subscribePlayerConnection(interfaceFunctions.playerConnection)
network.subscribeGiveUp(interfaceFunctions.giveUp)
network.subscribeErrConnection(interfaceFunctions.errConnection)

class GenericGame{
    updateDisplayGame(colorTop,colorPlayer, isPlayable){
        const statusGame = game.getStatusGame() 
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
            isMove=game.informSpecialMovement(informationPieceSelect)
        }
        else{
            isMove=game.informMove(informationPieceSelect) 
        }  
        return isMove
    }
    
    updateDisplayBoard(colorPlayer,isPlayable=true){
        const chessBoard=game.getCurrentBoard()
        viewController.updateBoard(chessBoard,colorPlayer,isPlayable) 
    }
    
    updateDisplayStatusCheck(colorPlayer){  
        const statusGame = game.getStatusGame() 
        if(statusGame.checkMate===true){
            viewController.updateStatusCheck(msgsAndAlerts.checksPiece.checkMate(colorPlayer))   
            gameSetup.addLogGame(msgsAndAlerts.checksPiece.checkMate(colorPlayer)) 
        }  
        else if(statusGame.check===true){
            viewController.updateStatusCheck(msgsAndAlerts.checksPiece.check(colorPlayer))
            gameSetup.addLogGame(msgsAndAlerts.checksPiece.check(colorPlayer)) 
        }
        else{
            viewController.updateStatusCheck(msgsAndAlerts.checksPiece.noCheck())
        }
    }
    
    updateDisplayCapturedPieces(colorTop){
        const capturedPieces = game.getCapturedPieces()
        viewController.updateCapturedPieces(colorTop,capturedPieces)
    }
    
    updateDisplayHistory(){
        const playHistory = game.getHistoryMoves()
        viewController.updateHistory(playHistory)
    }

    updateDisplayLog(){
        viewController.displayGameLog(gameSetup.gameLogs)
    }
}

class OfflineGame extends GenericGame{
    constructor(){
        super()
    }
    start(){
        viewController.hideHomeMenu()
        const connection={
            msg:msgsAndAlerts.connection.place(),
            typeGame:"offline",
        }
        viewController.updateStatusConection(connection)
        viewController.displayBackMovement()
        gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.bottom)
        game.starObjGame(gameSetup.currentPlayerColor)
        gameSetup.addLogGame(msgsAndAlerts.startGame.startGame())
        this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
    }

    move(informationPieceSelect){
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
            const nextColor=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
            gameSetup.addLogGame(msgsAndAlerts.movement.movementPiece(gameSetup.currentPlayerColor))
            gameSetup.updateCurrentPlayerColor(nextColor)
            gameSetup.addLogGame(msgsAndAlerts.movement.nextColor(gameSetup.currentPlayerColor))
        }
        this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
    }

    backPreviousMove(){
        viewController.hideEndGameInformation()
        const playHistory = game.getHistoryMoves()
        if(playHistory.length>0){
            game.returnMovement()
            const pastColor=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
            const statusGame = game.getStatusGame() 
            if(statusGame.endGame===false){
                gameSetup.addLogGame(msgsAndAlerts.movement.return(gameSetup.currentPlayerColor))
                gameSetup.updateCurrentPlayerColor(pastColor)
                gameSetup.addLogGame(msgsAndAlerts.movement.nextColor(gameSetup.currentPlayerColor))
                this.updateDisplayGame(gameSetup.colorsGame.top,pastColor)
            }
        }
    }

    restartGame(){
        gameSetup.clearGame()
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.displayHomeMenu()
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = game.getStatusGame() 
        if(statusGame.draw===true){
            const displayDraw=msgsAndAlerts.drawGame.draw()
            viewController.displayEndGameInformation(displayDraw)
            gameSetup.addLogGame(displayDraw)
            this.updateDisplayLog()
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            const displayEndGame=msgsAndAlerts.endGame.winPiece(statusGame.winColor)
            viewController.displayEndGameInformation(displayEndGame)
            this.updateDisplayLog()
        }
    }


}

class OnlineGame extends GenericGame{
    constructor(){
        super() 
    }

    async startNewRoom(nickAndCode){
        // nickAndCode = {name:value, roomCode:value}
        const informationConnectionRoom= await network.sendServer.startNewRoom(nickAndCode)
        if(informationConnectionRoom.serverConnection){
            viewController.hideHomeMenu()
            const connection={
                msg:msgsAndAlerts.connection.waitAdv(),
                typeGame:"online",
            }
            viewController.updateStatusConection(connection)
            gameSetup.addInformationPlayerOnline(nickAndCode.name,gameSetup.colorsGame.bottom)
            gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.bottom)
            game.starObjGame(gameSetup.currentPlayerColor)
            gameSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            gameSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(gameSetup.currentPlayerColor))
            const isPlayable = false
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor, isPlayable)
            network.enableCalls.playerConnection()
        }
        else{
            viewController.informationProminent(informationConnectionRoom.msg)
        }
    }

    async connectInARoom(nickAndCode){
        const informationConnectionRoom= await network.sendServer.connectInARoom(nickAndCode)
        if(informationConnectionRoom.serverConnection){
            viewController.hideHomeMenu()
            const connection={
                msg:msgsAndAlerts.connection.connected(informationConnectionRoom.statusPlayerAdv.namePlayer),
                typeGame:"online",
            }
            viewController.updateStatusConection(connection)
            gameSetup.addInformationPlayerOnline(nickAndCode.name,gameSetup.colorsGame.top)
            gameSetup.addNamePlayerAdv(nickAndCode.name)
            gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.top)
            game.starObjGame(gameSetup.currentPlayerColor)
            gameSetup.addLogGame(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            gameSetup.addLogGame(msgsAndAlerts.connection.connected(informationConnectionRoom.statusPlayerAdv.namePlayer))
            gameSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(gameSetup.currentPlayerColor))
            gameSetup.addLogGame(msgsAndAlerts.startGame.startGame())
            const isPlayable = false
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor, isPlayable)
            network.enableCalls.moveAdversary()
            network.enableCalls.statusGame()
        }
        else{
            viewController.informationProminent(informationConnectionRoom.msg)
        }
    }
    
    connectionPlayerTwo(statusPlayerAdv){
        if(statusPlayerAdv.isAdvConnected===false){
            viewController.displayEndGameInformation(statusPlayerAdv.msg)
            gameSetup.addLogGame(statusPlayerAdv.msg)
            this.updateDisplayLog()
        }
        else{
            gameSetup.addNamePlayerAdv(statusPlayerAdv.namePlayer)
            const connection={
                msg:msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer),
                typeGame:"online",
            }
            viewController.updateStatusConection(connection)
            gameSetup.addLogGame(msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer))
            gameSetup.addLogGame(msgsAndAlerts.startGame.colorPlayer(gameSetup.currentPlayerColor))
            gameSetup.addLogGame(msgsAndAlerts.startGame.startGame())
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
            network.enableCalls.statusGame()
        }
    }

    async move(informationPieceSelect){
        // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        const isMove = this.movePiece(informationPieceSelect)
        const nextColor=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
        const isPlayable=false
        gameSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(gameSetup.onlineConf.playerColor,gameSetup.onlineConf.playerName))
    
        if(isMove){
            const infSendMove = await network.sendServer.moveGame(informationPieceSelect)
            if(infSendMove.serverConnection){
                network.enableCalls.moveAdversary()
                gameSetup.updateCurrentPlayerColor(nextColor)
                gameSetup.addLogGame(msgsAndAlerts.movement.nextPlayer(gameSetup.currentPlayerColor,gameSetup.onlineConf.advName))
            }
            else{
                viewController.informationProminent(informationConnectionRoom.msg)
            }
        }
        else{
            viewController.informationProminent(msgsAndAlerts.incorrectMovement(gameSetup.currentPlayerColor))
        }
        
        this.updateDisplayGame(gameSetup.colorsGame.top,nextColor,isPlayable)
    }

    getMoveAdv(moveAdv){
        if(moveAdv.move===null){
            viewController.displayEndGameInformation(moveAdv.msg)
            gameSetup.updateEndGame()
            network.sendServer.endGame()
        }
        else{
            const isMove = this.movePiece(moveAdv.move)
            if(isMove){
                const nextColor=gameSetup.onlineConf.playerColor
                gameSetup.addLogGame(msgsAndAlerts.movement.movementPlayer(gameSetup.currentPlayerColor,gameSetup.onlineConf.advName))
                gameSetup.updateCurrentPlayerColor(nextColor)
                gameSetup.addLogGame(msgsAndAlerts.movement.nextPlayer(gameSetup.onlineConf.playerColor,gameSetup.onlineConf.playerName))
            }
            else{
                const incorrectMovement = msgsAndAlerts.movement.cheatMovement()
                gameSetup.addLogGame(incorrectMovement)
                viewController.displayEndGameInformation(incorrectMovement)
                network.sendServer.incorrectMovement()
                gameSetup.updateEndGame()
                network.sendServer.endGame()
            }
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
        }
    }

    restartGame(){
        if(gameSetup.endGame===false){
            network.sendServer.giveUp()
        }
        gameSetup.clearGame()
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.displayHomeMenu()
    }

    advGiveUp(){
        if(gameSetup.endGame===false){
            const displayGiveUp = msgsAndAlerts.giveUp.giveUpPlayer(gameSetup.onlineConf.advName)
            viewController.displayEndGameInformation(displayGiveUp)
            gameSetup.updateEndGame()
            network.sendServer.endGame()
        }
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = game.getStatusGame() 
        if(statusGame.draw===true){
            gameSetup.updateEndGame()
            const displayDraw=msgsAndAlerts.drawGame.draw()
            viewController.displayEndGameInformation(displayDraw)
            gameSetup.addLogGame(displayDraw)
            this.updateDisplayLog()
            network.sendServer.endGame()
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            gameSetup.updateEndGame()
            const nameWin = (statusGame.winColor===gameSetup.onlineConf.color)?gameSetup.onlineConf.playerName:gameSetup.onlineConf.advName
            const displayEndGame=msgsAndAlerts.endGame.winPlayer(nameWin)
            viewController.displayEndGameInformation(displayEndGame)
            gameSetup.addLogGame(displayEndGame)
            this.updateDisplayLog()
            network.sendServer.endGame()
        }
    }

    informationProminentErr(infConnetion){
        if(infConnetion.serverConnection === false){
            viewController.informationProminent(infConnetion.msg)
        }
    }
}
