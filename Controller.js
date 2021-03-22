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
        name:null
    }
}
let game = new createGame(playerConfig.colorsGame)
const startBoard = game.getCurrentBoard()

const viewController = new ViewController (startBoard)
const network = new interfaceNetwork()

const functionsGame={ //interfaaceFunctions
    startOfflineGame:function(){
        playerConfig.game = new offlineGame()
        playerConfig.game.start()
    },  
    startOnlineGame:function(nickAndKey){
        playerConfig.game = new onlineGame()
        playerConfig.game.start(nickAndKey)
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
viewController.subscribeStartOfflineGame(functionsGame.startOfflineGame)
viewController.subscribeStartOnlineGame(functionsGame.startOnlineGame)
viewController.subscribeMovePiece(functionsGame.move)
viewController.subscribeHistory(functionsGame.backPreviousMove)
viewController.subscribeRestartGame(functionsGame.restartGame)
network.subscribeMoveAdversary(functionsGame.moveAdv)
network.subscribePlayerConnection(functionsGame.playerConnection)
network.subscribeGiveUp(functionsGame.giveUp)
network.subscribeErrConnection(functionsGame.errConnection)


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
        playerConfig.currentPlayerColor="White"
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
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
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
    async start(nickAndCode){
        // nickAndCode = {name:value, roomCode:value}
        const infCode= await network.sendSever.infStartGame(nickAndCode)
        if(infCode.connectedServer){
            viewController.hideHomeMenu()
            this.gameLog(this.typeMsgLog.room, nickAndCode.roomCode)
            if(infCode.playerAdv.connection===false){
                const connection={
                    msg: "wait",
                    type:"online"
                } 
                viewController.updateStatusConection(connection)
                playerConfig.onlinePlayer.color="White"
                playerConfig.onlinePlayer.name=nickAndCode.name
                playerConfig.currentPlayerColor =playerConfig.onlinePlayer.color
                const isPlayable = false
                game.starObjGame(playerConfig.currentPlayerColor)
                this.gameLog(this.typeMsgLog.start)
                this.gameLog(this.typeMsgLog.colorPlayer,playerConfig.onlinePlayer.color)
                this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
                network.enableCalls.playerConnection()
            }
            else{
                const connection={
                    msg: "connected",
                    type:"online"
                } 
                viewController.updateStatusConection(connection,infCode.playerAdv.namePlayer)
                playerConfig.onlinePlayer.color="Black"
                playerConfig.currentPlayerColor="White"
                const isPlayable = false
                game.starObjGame(playerConfig.currentPlayerColor)
                this.gameLog(this.typeMsgLog.start)
                this.gameLog(this.typeMsgLog.waitAdv)
                this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
                network.enableCalls.moveAdversary()
            }
            network.enableCalls.statusGame()
        }
    }
    
    connectionPlayerTwo(infPlayerAdv){
        if(infPlayerAdv.connection===false){
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
            viewController.updateStatusConection(connection,infPlayerAdv.namePlayer)
            this.gameLog(this.typeMsgLog.colorPlayer,playerConfig.onlinePlayer.color)
            this.updateDisplayGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
        }
    }

    move(informationPieceSelect){
        const isMove = this.movePiece(informationPieceSelect)
        if(isMove){
            // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
            const infSendMove = network.sendSever.moveGame(informationPieceSelect)
            if(infSendMove){
                network.enableCalls.moveAdversary()
            }
        }
        const isPlayable=false
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        this.gameLog(this.typeMsgLog.movement,playerConfig.currentPlayerColor)
        playerConfig.currentPlayerColor=nextPlayer
        this.gameLog(this.typeMsgLog.nextPlayer,nextPlayer)
        this.updateDisplayGame(nextPlayer,playerConfig.colorsGame.top,isPlayable)
        const infEndGame = this.getEndGame()
        if(infEndGame.typeEndGame){
            const endGame={
                typeEndGame:infEndGame.typeEndGame,
                colorWin: infEndGame.typeEndGame.colorWin, 
                namePlayer:playerConfig.onlinePlayer.name
            }
            this.endGame(endGame)
        }
    }

    getMoveAdv(infMoveAdv){
        if(infMoveAdv.movet===false){
            viewController.informationProminent(infCode.msg)
        }
        else{
            const isMove = this.movePiece(infMoveAdv.move)
            if(isMove){
                // network.sendSever.recMoveGame("true")
            }
            else{
                // enviar caso tiver movimento invalido
                // network.sendSever.recMoveGame("false")
            }
            const nextPlayer=playerConfig.onlinePlayer.color
            this.gameLog(this.typeMsgLog.movement,playerConfig.currentPlayerColor)
            playerConfig.currentPlayerColor=nextPlayer
            this.gameLog(this.typeMsgLog.nextPlayer,nextPlayer)
            this.updateDisplayGame(playerConfig.colorsGame.top,nextPlayer)
            const infEndGame = this.getEndGame()
            if(infEndGame.typeEndGame){
                const endGame={
                    typeEndGame:infEndGame.typeEndGame,
                    colorWin: infEndGame.colorWin, 
                    namePlayer:infMoveAdv.infPlayerAdv.namePlayer
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
        const infGiveUp={
            typeEndGame:"giveUp",
            colorWin: infPlayerAdv.color, 
            namePlayer:infPlayerAdv.namePlayer,
            sendServer:true
        }
        this.gameLog(this.typeMsgLog.fiveUp,infGiveUp.namePlayer)
        this.endGame(infGiveUp)
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