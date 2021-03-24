import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"
import msgsAndAlerts from "./MsgsAndAlerts.js"

class setup{
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
    }
    updateCurrentPlayerColor(color){
        this.currentPlayerColor=color
    }
    addGame(game){
        this.game=game
    }
    addInformationPlayerOnline(playerName,playerColor){
        this.onlineConf.playerColor=playerColor
        this.onlineConf.playerName=playerName
    }
    addNamePlayerAdv(advName){
        this.onlineConf.advName=advName
    }
    clearGame(){
        this.game=null
    }
    clearOnlineConf(){
        this.onlineConf.playerColor=null
        this.onlineConf.playerName=null
        this.onlineConf.advName=null
    }
}

const gameSetup = new setup()
let game = new createGame(gameSetup.colorsGame)
const startBoard = game.getCurrentBoard()

const viewController = new ViewController (startBoard)
const network = new interfaceNetwork()

const interfaceFunctions={ 
    startGameOffline:function(){
        gameSetup.addGame(new offlineGame())
        gameSetup.game.start()
    },  
    startNewRoomOnline:function(nickAndCode){
        gameSetup.addGame(new onlineGame())
        gameSetup.game.startNewRoom(nickAndCode)
    },
    connectInARoomOnline:function(nickAndCode){
        gameSetup.addGame(new onlineGame())
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
        gameSetup.game.informationProminent(msgErr)
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

class genericGame{
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
        // this.updateDisplayLog()   
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
            this.gameLog(msgsAndAlerts.checksPiece.checkMate(colorPlayer)) 
        }  
        else if(statusGame.check===true){
            viewController.updateStatusCheck(msgsAndAlerts.checksPiece.check(colorPlayer))
            this.gameLog(msgsAndAlerts.checksPiece.chec(colorPlayer)) 
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
}

class offlineGame extends genericGame{
    constructor(){
        super()
        this.infGameLog=[] //new gameLog() - array,fun criar a msg array, limpar log, retornar array -getLog
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
        this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
        this.gameLog(msgsAndAlerts.startGame.startGame())
    }

    move(informationPieceSelect){
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
            const nextColor=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
            this.gameLog(msgsAndAlerts.movement.movementPiece(gameSetup.currentPlayerColor))
            gameSetup.updateCurrentPlayerColor(nextColor)
            this.gameLog(msgsAndAlerts.movement.nextColor(gameSetup.currentPlayerColor))
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
                this.gameLog(msgsAndAlerts.movement.return(gameSetup.currentPlayerColor))
                this.updateDisplayGame(gameSetup.colorsGame.top,pastColor)
                gameSetup.updateCurrentPlayerColor(pastColor)
                this.gameLog(msgsAndAlerts.movement.nextColor(gameSetup.currentPlayerColor))
            }
        }
    }

    restartGame(){
        gameSetup.clearGame()
        gameSetup.updateCurrentPlayerColor(null)
        gameSetup.clearOnlineConf()
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.displayHomeMenu()
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = game.getStatusGame() 
        if(statusGame.draw===true){
            const displayDraw=msgsAndAlerts.drawGame.draw()
            viewController.displayEndGameInformation(displayDraw)
            this.gameLog(displayDraw)
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            const displayEndGame=msgsAndAlerts.endGame.winPiece(statusGame.winColor)
            viewController.displayEndGameInformation(displayEndGame)
            this.gameLog(displayEndGame)
        }
    }

    gameLog(type,color=null){
        const informativeLog ={
            time:Date.now(),
            typeMsg:type,
            colorPiece:color,//parametro
        }
        this.infGameLog.push([informativeLog])
        // viewController.displayInfLog(this.infGameLog)
    }
}

class onlineGame extends genericGame{
    constructor(){
        super()
        this.infGameLog=[]
    }

    async startNewRoom(nickAndCode){
        // nickAndCode = {name:value, roomCode:value}
        const informationConnectionRoom= await network.sendServer.startNewRoom(nickAndCode)
        if(informationConnectionRoom.connectedServer){
            viewController.hideHomeMenu()
            const connection={
                msg:msgsAndAlerts.connection.waitAdv(),
                typeGame:"Online",
            }
            viewController.updateStatusConection(connection)
            gameSetup.addInformationPlayerOnline(nickAndCode.name,gameSetup.colorsGame.top)
            gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.bottom)
            game.starObjGame(gameSetup.currentPlayerColor)
            this.gameLog(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            this.gameLog(msgsAndAlerts.startGame.colorPlayer(gameSetup.currentPlayerColor))
            const isPlayable = false
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor, isPlayable)
            network.enableCalls.playerConnection()
            network.enableCalls.statusGame()
        }
        else{
            viewController.informationProminent(informationConnectionRoom.msg)
        }
    }

    async connectInARoom(nickAndCode){
        const informationConnectionRoom= await network.sendServer.connectInARoom(nickAndCode)
        if(informationConnectionRoom.connectedServer){
            viewController.hideHomeMenu()
            const connection={
                msg:msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer),
                typeGame:"Online",
            }
            viewController.updateStatusConection(connection)
            gameSetup.addInformationPlayerOnline(nickAndCode.name,gameSetup.colorsGame.top)
            gameSetup.addNamePlayerAdv(nickAndCode.name)
            gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.top)
            game.starObjGame(gameSetup.currentPlayerColor)
            this.gameLog(msgsAndAlerts.roomAndCode.connectedRoom(nickAndCode.roomCode))
            this.gameLog(msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer))
            this.gameLog(msgsAndAlerts.startGame.colorPlayer(gameSetup.currentPlayerColor))
            this.gameLog(msgsAndAlerts.startGame.startGame())
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
        if(statusPlayerAdv.connection===false){
            const noAdv=msgsAndAlerts.start.noAdv()
            this.endGame(noAdv)
        }
        else{
            gameSetup.addNamePlayerAdv(statusPlayerAdv.namePlayer)
            const connection={
                msg:msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer),
                typeGame:"Online",
            }
            viewController.updateStatusConection(connection)
            this.gameLog(msgsAndAlerts.connection.connected(statusPlayerAdv.namePlayer))
            this.gameLog(msgsAndAlerts.startGame.colorPlayer(gameSetup.currentPlayerColor))
            this.gameLog(msgsAndAlerts.startGame.startGame())
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
        }
    }

    async move(informationPieceSelect){
        // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        const isMove = this.movePiece(informationPieceSelect)
        const nextColor=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
        const isPlayable=false
        this.updateDisplayGame(nextColor,gameSetup.colorsGame.top,isPlayable)
        this.gameLog(msgsAndAlerts.movement.movementPlayer(game.onlineConf.playerColor,game.onlineConf.playerName))
    
        if(isMove){
            const infSendMove = await network.sendServer.moveGame(informationPieceSelect)
            if(infSendMove.connectedServer){
                network.enableCalls.moveAdversary()
                gameSetup.updateCurrentPlayerColor(nextColor)
                this.gameLog(msgsAndAlerts.movement.nextPlayer(gameSetup.currentPlayerColor,game.onlineConf.advName))
            }
            else{
                this.gameLog(msgsAndAlerts.movement.movementIncorret(gameSetup.currentPlayerColor))
                viewController.informationProminent(infSendMove.msg)
            }
        }
        else{
            // viewController.informationProminent(infSendMove.msg) informar que a jogada estava errada
        }
    }

    getMoveAdv(moveAdv){
        if(moveAdv.move===null){
            viewController.informationProminent(moveAdv.msg)
            network.sendServer.EndGame()
        }
        else{
            const isMove = this.movePiece(moveAdv.move)
            if(isMove){
                const nextColor=gameSetup.onlineConf.playerColor
                this.gameLog(msgsAndAlerts.movement.movementPlayer(gameSetup.currentPlayerColor,game.onlineConf.advName))
                gameSetup.updateCurrentPlayerColor(nextColor)
                this.gameLog(msgsAndAlerts.movement.nextPlayer(game.onlineConf.playerColor,game.onlineConf.playerName))
            }
            else{
                this.gameLog(msgsAndAlerts.movement.movementIncorret(gameSetup.currentPlayerColor))
                network.sendServer.movementIncorret()
            }
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
        }
    }

    restartGame(){
        network.sendServer.giveUp()
        gameSetup.clearGame()
        gameSetup.updateCurrentPlayerColor(null)
        gameSetup.clearOnlineConf()
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.displayHomeMenu()
    }

    advGiveUp(infPlayerAdv){
        const displayGiveUp = msgsAndAlerts.giveUp.giveUpPlayer(infPlayerAdv.namePlayer)
        this.gameLog(displayGiveUp)
        viewController.displayEndGameInformation(displayGiveUp)
        network.sendServer.endGame()
    }

    updateDisplayDrawAndEndGame(){
        const statusGame = game.getStatusGame() 
        if(statusGame.draw===true){
            const displayDraw=msgsAndAlerts.drawGame.draw()
            viewController.displayEndGameInformation(displayDraw)
            this.gameLog(displayDraw)
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            const nameWin = (statusGame.winColor===game.onlineConf.color)?game.onlineConf.playerName:game.onlineConf.advName
            const displayEndGame=msgsAndAlerts.endGame.winPlayer(nameWin)
            viewController.displayEndGameInformation(displayEndGame)
            this.gameLog(displayEndGame)
        }
    }

    informationProminent(infConnetion){
        if(infConnetion.connectedServer === false){
            viewController.informationProminent(infConnetion.msg)
        }
    }

    gameLog(type,infComplement){
        const informativeLog ={
            time:Date.now(),
            typeMsg:type,
            infComplement:infComplement,
        }
        this.infGameLog.push([informativeLog])
        // viewController.displayInfLog(this.infGameLog)
    }
}
