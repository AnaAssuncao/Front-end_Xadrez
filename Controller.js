import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"

const playerConfig={
    game:null,
    colorsGame:{   
        top:"Black", //colorTop
        bottom:"White", //colorBottom
    },
    currentPlayerColor:null, //colorCurrentPlayer
    onlinePlayer:{
        color:null,
        name:null
    },
    endGame:false
}
let game = new createGame(playerConfig.colorsGame)
const startBoard = game.getCurrentBoard()

const viewController = new ViewController (startBoard)
const network = new interfaceNetwork()

const functionsGame={
    startOfflineGame:function(){
        game = new createGame(playerConfig.colorsGame)
        playerConfig.game = new offlineGame()
        playerConfig.game.start()
    },  
    startOnlineGame:function(infGame){
        game = new createGame(playerConfig.colorsGame)
        playerConfig.game = new onlineGame()
        playerConfig.game.start(infGame)
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

viewController.exposeHomePage()
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
    updateGame(colorTop,colorPlayer, isPlayable){
        const statusGame = game.getStatusGame() 
        if(statusGame.endGame){
            isPlayable=false
        }
        this.updateBoard(colorPlayer,isPlayable) 
        const infEndGame= this.updateInformationGame(colorPlayer)
        this.updateCapturedPiece(colorTop)
        this.updatePlaysHistory()    
        return infEndGame
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
    
    updateBoard(colorPlayer,isPlayable=true){
        const chessBoard=game.getCurrentBoard()
        viewController.updateBoard(chessBoard,colorPlayer,isPlayable) 
    }
    
    updateInformationGame(colorPlayer){  
        let infEndGame ={
            typeEndGame:null,
            colorWin:null
        }
        const statusGame = game.getStatusGame() 
        if(statusGame.checkMate===true){
            const checkMate = "checkMate"
            infEndGame.typeEndGame= "checkMate"
            viewController.updateStatusCheck(checkMate,colorPlayer)
        }
        else if(statusGame.check===true){
            const check= "check"
            viewController.updateStatusCheck(check,colorPlayer)
        }
        else{
            const noCheck= "noCheck"
            viewController.updateStatusCheck(noCheck)
        }
        if(statusGame.draw===true){
            infEndGame.typeEndGame= "draw"
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            infEndGame.typeEndGame= "endGame"
        }
        if(statusGame.playerWin){
            infEndGame.colorWin=statusGame.playerWin
        }
        return infEndGame
    }
    
    updateCapturedPiece(colorTop){
        const capturedPieces = game.getCapturedPieces()
        viewController.updateCapturedPieces(colorTop,capturedPieces)
    }
    
    updatePlaysHistory(){
        const playHistory = game.getHistoryMoves()
        viewController.updateHistory(playHistory)
    }
}

class offlineGame extends genericGame{
    start(){
        viewController.hideHomePage()
        playerConfig.currentPlayerColor="White"
        const connection={
            msg:"place",
            type:"offline"
        }
        viewController.updateStatusConection(connection)
        viewController.exposeBackMovement()
        game.starObjGame(playerConfig.currentPlayerColor)
        this.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
    }

    move(informationPieceSelect){
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        const isMove =this.movePiece(informationPieceSelect)
        if(isMove){
            playerConfig.currentPlayerColor=nextPlayer
        }
        const infEndGame=this.updateGame(playerConfig.colorsGame.top,nextPlayer)
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
                this.updateGame(playerConfig.colorsGame.top,pastColor)
                playerConfig.currentPlayerColor=pastColor
            }
        }
    }

    restartGame(){
        playerConfig.game = null
        playerConfig.currentPlayerColor= null
        playerConfig.onlinePlayer.color= null
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.exposeHomePage()
    }

    endGame(infEndGame){
        const endGameType = {
            checkMate:"winPiece",
            draw: "draw",
            endGame: "winPiece",
        }
        viewController.exposeEndGameInformation(endGameType[infEndGame.typeEndGame],infEndGame.colorWin)
    }
}

class onlineGame extends genericGame{
    async start(infGame){
        // infGame = {name:value, roomCode:value}
        const infCode= await network.sendSever.infStartGame(infGame)
        if(infCode.connectedServer){
            viewController.hideHomePage()
            if(infCode.playerAdv.connection===false){
                const connection={
                    msg: "wait",
                    type:"online"
                } 
                viewController.updateStatusConection(connection)
                playerConfig.onlinePlayer.color="White"
                playerConfig.onlinePlayer.name=infGame.name
                playerConfig.currentPlayerColor =playerConfig.onlinePlayer.color
                const isPlayable = false
                game.starObjGame(playerConfig.currentPlayerColor)
                this.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
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
                this.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
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
            this.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
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
        const infEndGame=this.updateGame(nextPlayer,playerConfig.colorsGame.top,isPlayable)
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
            const infEndGame=this.updateGame(playerConfig.colorsGame.top,nextPlayer)
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
        viewController.exposeHomePage()
    }

    advGiveUp(infPlayerAdv){
        const infGiveUp={
            typeEndGame:"giveUp",
            colorWin: infPlayerAdv.color, 
            namePlayer:infPlayerAdv.namePlayer,
            sendServer:true
        }
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
        viewController.exposeEndGameInformation(endGameType[infEndGame.typeEndGame],infEndGame.colorWin,infEndGame.namePlayer)
        network.sendSever.endGame()
    }

    informationProminent(infConnetion){
        if(infConnetion.connectedServer === false){
            viewController.informationProminent(infConnetion.msg)
        }
    }
}