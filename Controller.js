import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"

const playerConfig={
    game:null,
    colorsGame:{   
        top:"Black", 
        bottom:"White", 
    },
    currentPlayerColor:null, 
    onlinePlayer:{
        color:null,
        myName:null,
        advname:null
    }
}
let game = new createGame(playerConfig.colorsGame)
const startBoard = game.getCurrentBoard()

const viewController = new ViewController (startBoard)
const network = new interfaceNetwork()

const interfaceFunctions={ 
    startGameOffline:function(){
        playerConfig.game = new offlineGame()
        playerConfig.game.start()
    },  
    startNewRoomOnline:function(nickAndCode){
        playerConfig.game = new onlineGame()
        playerConfig.game.startNewRoom(nickAndCode)
    },
    connectInARoomOnline:function(nickAndCode){
        playerConfig.game = new onlineGame()
        playerConfig.game.connectInARoom(nickAndCode)
    },
    restartGame:function(){
        playerConfig.game.restartGame()
    },
    move:function(informationPieceSelect){
        playerConfig.game.move(informationPieceSelect)
    },
    backPreviousMove:function(){
        playerConfig.game.backPreviousMove()
    },
    moveAdv:function(infMoveAdv){
        playerConfig.game.getMoveAdv(infMoveAdv)
    },
    playerConnection:function(infPlayerAdv){
        playerConfig.game.connectionPlayerTwo(infPlayerAdv)
    },
    giveUp:function(infPlayerAdv){
        playerConfig.game.advGiveUp(infPlayerAdv)
    },
    errConnection(msgErr){
        playerConfig.game.informationProminent(msgErr)
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
        this.updateDisplayStatusGame(colorPlayer)
        this.updateDisplayCapturedPieces(colorTop)
        this.updateDisplayHistory()    
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
    
    updateDisplayStatusGame(colorPlayer){  
        const statusGame = game.getStatusGame() 
        if(statusGame.checkMate===true){
            const checkMate = "checkMate"
            // (msgAndAlert.gameMsg.checkMatte(colorPlayer))
            this.gameLog(this.typeMsgLog.checkMate,colorPlayer)
            viewController.updateStatusCheck(checkMate,colorPlayer)
            this.gameLog(this.typeMsgLog.win,statusGame.playerWin)
        }
        else if(statusGame.check===true){
            const check= "check"
            this.gameLog(this.typeMsgLog.check,colorPlayer)
            viewController.updateStatusCheck(check,colorPlayer)
        }
        else{
            const noCheck= "noCheck"
            viewController.updateStatusCheck(noCheck)
        }
        if(statusGame.draw===true){
            this.gameLog(this.typeMsgLog.draw)
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            this.gameLog(this.typeMsgLog.win,statusGame.playerWin)
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
        this.typeMsgLog={
            start:"start",
            win:"win",
            returnMovement:"returnMovement",
            movement:"movement",
            nextColor:"nextColor",
            checkMate:"checkMate",
            check:"check",
            draw:"draw",
        }
    }
    start(){
        viewController.hideHomeMenu()
        playerConfig.currentPlayerColor=playerConfig.colorsGame.bottom
        const connection={
            msg:"place",//msgandalets.status.connection.place
            type:"offline"
        }
        viewController.updateStatusConection(connection)
        viewController.displayBackMovement()
        game.starObjGame(playerConfig.currentPlayerColor)
        this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
        this.gameLog(this.typeMsgLog.start)
    }

    move(informationPieceSelect){
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
            const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
            this.gameLog(this.typeMsgLog.movement,playerConfig.currentPlayerColor)
            playerConfig.currentPlayerColor=nextPlayer
            this.gameLog(this.typeMsgLog.nextPlayer,nextPlayer)
        }
        this.updateDisplayGame(playerConfig.colorsGame.top,nextPlayer)
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
            const pastColor=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
            const statusGame = game.getStatusGame() 
            if(statusGame.endGame===false){
                this.gameLog(this.typeMsgLog.returnMovement,playerConfig.currentPlayerColor)
                this.updateDisplayGame(playerConfig.colorsGame.top,pastColor)
                playerConfig.currentPlayerColor=pastColor
                this.gameLog(this.typeMsgLog.nextPlayer,pastColor)
            }
        }
    }

    restartGame(){
        playerConfig.game = null
        playerConfig.currentPlayerColor= null
        playerConfig.onlinePlayer.color= null
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.displayHomeMenu()
    }

    endGame(infEndGame){
        const endGameType = {
            checkMate:"winPiece",
            draw: "draw",
            endGame: "winPiece",
        }
        viewController.displayEndGameInformation(endGameType[infEndGame.typeEndGame],infEndGame.colorWin)
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
            const connection={
                msg: "wait",
                type:"online"
            } 
            viewController.updateStatusConection(connection)
            playerConfig.onlinePlayer.color=playerConfig.colorsGame.bottom
            playerConfig.onlinePlayer.name=nickAndCode.name
            playerConfig.currentPlayerColor=playerConfig.onlinePlayer.color
            const isPlayable = false
            game.starObjGame(playerConfig.currentPlayerColor)
            this.gameLog(this.typeMsgLog.start)
            this.gameLog(this.typeMsgLog.colorPlayer,playerConfig.onlinePlayer.color)
            this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
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
            const connection={
                msg: "connected",
                type:"online"
            } 
            viewController.updateStatusConection(connection,informationConnectionRoom.advPlayer.namePlayer)
            playerConfig.onlinePlayer.name=nickAndCode.name
            playerConfig.onlinePlayer.advName=informationConnectionRoom.advPlayer.namePlayer
            playerConfig.onlinePlayer.color=playerConfig.colorsGame.top
            playerConfig.currentPlayerColor=playerConfig.colorsGame.bottom
            const isPlayable = false
            game.starObjGame(playerConfig.currentPlayerColor)
            this.gameLog(this.typeMsgLog.start)
            this.gameLog(this.typeMsgLog.waitAdv)
            this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
            network.enableCalls.moveAdversary()
            network.enableCalls.statusGame()
        }
        else{
            viewController.informationProminent(informationConnectionRoom.msg)
        }
    }
    
    connectionPlayerTwo(statusPlayerAdv){
        if(statusPlayerAdv.connection===false){
            const noAdv={
                typeEndGame: "noAdv",
                sendServer:true
            }
            this.endGame(noAdv)
        }
        else{
            const connection={
                msg: "connected",
                type:"online"
            } 
            playerConfig.onlinePlayer.advName=statusPlayerAdv.namePlayer
            viewController.updateStatusConection(connection,statusPlayerAdv.namePlayer)
            this.gameLog(this.typeMsgLog.colorPlayer,playerConfig.onlinePlayer.color)
            this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
        }
    }

    async move(informationPieceSelect){
        // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
        const isMove = this.movePiece(informationPieceSelect)
        const isPlayable=false
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        this.gameLog(this.typeMsgLog.movement,playerConfig.currentPlayerColor)
        this.gameLog(this.typeMsgLog.nextPlayer,nextPlayer)
        this.updateDisplayGame(nextPlayer,playerConfig.colorsGame.top,isPlayable)

        if(isMove){
            const infSendMove = await network.sendSever.moveGame(informationPieceSelect)
            if(infSendMove.connectedServer){
                if(infSendMove.isCorrectMove){
                    network.enableCalls.moveAdversary()
                    playerConfig.currentPlayerColor=nextPlayer
                    const infEndGame = this.getEndGame()
                    if(infEndGame.typeEndGame){
                        const endGame={
                            typeEndGame:infEndGame.typeEndGame,
                            colorWin: infEndGame.typeEndGame.colorWin, 
                            namePlayer:playerConfig.onlinePlayer.name
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
                const nextPlayer=playerConfig.onlinePlayer.color
                this.gameLog(this.typeMsgLog.movement,playerConfig.currentPlayerColor)
                playerConfig.currentPlayerColor=nextPlayer
                this.gameLog(this.typeMsgLog.nextPlayer,nextPlayer)
            }
            else{
                this.gameLog(this.typeMsgLog.movement,playerConfig.currentPlayerColor)
            }
            network.sendSever.confirmMovement(isMove)
            this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
            const infEndGame = this.getEndGame()
            if(infEndGame.typeEndGame){
                const endGame={
                    typeEndGame:infEndGame.typeEndGame,
                    colorWin: infEndGame.colorWin, 
                    namePlayer:onlinePlayer.advName
                }
                this.endGame(endGame)
            }
        }
    }

    restartGame(){
        network.sendSever.giveUp()
        playerConfig.game = null
        playerConfig.currentPlayerColor= null
        playerConfig.onlinePlayer.color= null
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

const msgAndAlerts = {
    errorConnection:"erro na conexão",
    errorConnection:(param)=>"erro na conexão"+param
}