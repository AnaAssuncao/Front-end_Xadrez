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
            const displayCheckMate=msgsAndAlerts.status.checksPiece.checkMate(colorPlayer)
            viewController.updateStatusCheck(displayCheckMate)   
        }
        else if(statusGame.check===true){
            const displayCheck=msgsAndAlerts.status.checksPiece.check(colorPlayer)
            viewController.updateStatusCheck(displayCheck)
        }
        else{
            const noCheck= msgsAndAlerts.status.checksPiece.noCheck()
            viewController.updateStatusCheck(noCheck)
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

    getEndGame(){  
        let infEndGame ={
            typeEndGame:null,
            colorWin:null,
            status:{
                checkMate:"checkMate",
                noCheck: "noCheck",
                check: "check"
            }
        }
        const statusGame = game.getStatusGame() 
        if(statusGame.playerWin){
            infEndGame.colorWin=statusGame.playerWin
        }
        if(statusGame.checkMate===true){
            const checkMate = "checkMate"
            infEndGame.typeEndGame= "checkMate"
        }
        else if(statusGame.draw===true){
            infEndGame.typeEndGame= "draw"
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            infEndGame.typeEndGame= "endGame"
        }
        return infEndGame
    }
}

class offlineGame extends genericGame{
    constructor(){
        super()
        this.infGameLog=[] //new gameLog() - array,fun criar a msg array, limpar log, retornar array -getLog
    }
    start(){
        viewController.hideHomeMenu()
        gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.bottom)
        viewController.updateStatusConection(msgsAndAlerts.status.connection.place)
        viewController.displayBackMovement()
        game.starObjGame(gameSetup.currentPlayerColor)
        this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
        const start = msgsAndAlerts.status.start.startGame()
        this.gameLog(start)
    }

    move(informationPieceSelect){
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
            const nextPlayer=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
            const movement = msgsAndAlerts.status.movement.movementPiece(gameSetup.currentPlayerColor)
            this.gameLog(movement)
            gameSetup.updateCurrentPlayerColor(nextPlayer)
            const next = msgsAndAlerts.status.movement.movementPiece(gameSetup.currentPlayerColor)
            this.gameLog(next)
        }
        this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
        const infEndGame = this.getEndGame()
        if(infEndGame.typeEndGame){
            this.endGame(infEndGame)
        }
    }

    backPreviousMove(){
        viewController.hideEndGameInformation()
        const playHistory = game.getHistoryMoves()
        if(playHistory.length>0){
            game.returnMovement()
            const pastColor=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
            const statusGame = game.getStatusGame() 
            if(statusGame.endGame===false){
                const movement = msgsAndAlerts.status.movement.return(gameSetup.currentPlayerColor)
                this.gameLog(movement)
                this.updateDisplayGame(gameSetup.colorsGame.top,pastColor)
                gameSetup.updateCurrentPlayerColor(pastColor)
                const next = msgsAndAlerts.status.movement.movementPiece(gameSetup.currentPlayerColor)
                this.gameLog(next)
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

    endGame(infEndGame){
        viewController.displayEndGameInformation(infEndGame)
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
        this.typeMsgLog={
            start:"start",
            win:"win",
            movement:"movement",
            nextPlayer:"nextColor",
            checkMate:"checkMate",
            check:"check",
            draw:"draw",
            waitAdv:"waitAdv",
            room:"room",
            colorPlayer:"colorPlayer"
        }
    }

    async startNewRoom(nickAndCode){
        // nickAndCode = {name:value, roomCode:value}
        const informationConnectionRoom= await network.sendSever.startNewRoom(nickAndCode)
        if(informationConnectionRoom.connectedServer){
            viewController.hideHomeMenu()
            this.gameLog(this.typeMsgLog.room, nickAndCode.roomCode)
            viewController.updateStatusConection(msgsAndAlerts.status.connection.waitAdv)
            gameSetup.addInformationPlayerOnline(nickAndCode.name,gameSetup.colorsGame.top)
            gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.bottom)
            const isPlayable = false
            game.starObjGame(gameSetup.currentPlayerColor)
            this.gameLog(this.typeMsgLog.start)
            this.gameLog(this.typeMsgLog.colorPlayer,gameSetup.onlineConf.playerColor)
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor, isPlayable)
            network.enableCalls.playerConnection()
            network.enableCalls.statusGame()
        }
        else{
            viewController.informationProminent(informationConnectionRoom.msg)
        }
    }

    async connectInARoom(nickAndCode){
        const informationConnectionRoom= await network.sendSever.connectInARoom(nickAndCode)
        if(informationConnectionRoom.connectedServer){
            viewController.hideHomeMenu()
            this.gameLog(this.typeMsgLog.room, nickAndCode.roomCode)
            viewController.updateStatusConection(msgsAndAlerts.status.connection.connected,informationConnectionRoom.advPlayer.namePlayer)
            gameSetup.addInformationPlayerOnline(nickAndCode.name,gameSetup.colorsGame.top)
            gameSetup.addNamePlayerAdv(nickAndCode.name)
            gameSetup.updateCurrentPlayerColor(gameSetup.colorsGame.top)
            const isPlayable = false
            game.starObjGame(gameSetup.currentPlayerColor)
            this.gameLog(this.typeMsgLog.start)
            this.gameLog(this.typeMsgLog.waitAdv)
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
            const noAdv=msgsAndAlerts.status.start.noAdv()
            this.endGame(noAdv)
        }
        else{
            gameSetup.addNamePlayerAdv(statusPlayerAdv.namePlayer)
            viewController.updateStatusConection(msgsAndAlerts.status.connection.connected,statusPlayerAdv.namePlayer)
            this.gameLog(this.typeMsgLog.colorPlayer,gameSetup.onlineConf.playerColor)
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
        }
    }

    async move(informationPieceSelect){
        // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        const isMove = this.movePiece(informationPieceSelect)
        const isPlayable=false
        const nextPlayer=(gameSetup.colorsGame.top===gameSetup.currentPlayerColor)?gameSetup.colorsGame.bottom:gameSetup.colorsGame.top
        this.gameLog(this.typeMsgLog.movement,gameSetup.currentPlayerColor)
        this.gameLog(this.typeMsgLog.nextPlayer,nextPlayer)
        this.updateDisplayGame(nextPlayer,gameSetup.colorsGame.top,isPlayable)

        if(isMove){
            const infSendMove = await network.sendSever.moveGame(informationPieceSelect)
            if(infSendMove.connectedServer){
                if(infSendMove.isCorrectMove){
                    network.enableCalls.moveAdversary()
                    gameSetup.updateCurrentPlayerColor(nextPlayer)
                    const infEndGame = this.getEndGame()
                    if(infEndGame.typeEndGame){
                        const endGame={
                            typeEndGame:infEndGame.typeEndGame,
                            colorWin: infEndGame.typeEndGame.colorWin, 
                            namePlayer:gameSetup.onlineConf.name
                        }
                    }
                }
                else{
                    viewController.informationProminent(infSendMove.msg)
                }
            }
            else{
                viewController.informationProminent(infSendMove.msg)
            }
        }
    }

    getMoveAdv(moveAdv){
        if(moveAdv.move===null){
            viewController.informationProminent(moveAdv.msg)
        }
        else{
            const isMove = this.movePiece(moveAdv.move)
            if(isMove){
                const nextPlayer=gameSetup.onlineConf.playerColor
                this.gameLog(this.typeMsgLog.movement,gameSetup.currentPlayerColor)
                gameSetup.updateCurrentPlayerColor(nextPlayer)
                this.gameLog(this.typeMsgLog.nextPlayer,nextPlayer)
            }
            else{
                this.gameLog(this.typeMsgLog.movement,gameSetup.currentPlayerColor)
            }
            network.sendSever.confirmMovement(isMove)
            this.updateDisplayGame(gameSetup.colorsGame.top,gameSetup.currentPlayerColor)
            const infEndGame = this.getEndGame()
            if(infEndGame.typeEndGame){
                const endGame={
                    typeEndGame:infEndGame.typeEndGame,
                    colorWin: infEndGame.colorWin, 
                    namePlayer:gameSetup.onlineConf.advName
                }
                this.endGame(endGame)
            }
        }
    }

    restartGame(){
        network.sendSever.giveUp()
        gameSetup.clearGame()
        gameSetup.updateCurrentPlayerColor(null)
        gameSetup.clearOnlineConf()
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.displayHomeMenu()
    }

    advGiveUp(infPlayerAdv){
        this.gameLog(this.typeMsgLog.fiveUp,infGiveUp.namePlayer)
        this.endGame(infPlayerAdv)
    }

    endGame(infEndGame){
        const endGameType = {
            checkMate:"winPiece",
            draw: "draw",
            endGame: "winPiece",
            giveUp: "giveUp",
            noAdv:"noAdv"
        }
        viewController.displayEndGameInformation(endGameType[infEndGame.typeEndGame],infEndGame.colorWin,infEndGame.namePlayer)
        network.sendSever.endGame()
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
