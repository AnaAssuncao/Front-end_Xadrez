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

class offlineGame{
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
        generalFunctions.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
    }

    move(informationPieceSelect){
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        const isMove =generalFunctions.movePiece(informationPieceSelect)
        if(isMove){
            playerConfig.currentPlayerColor=nextPlayer
        }
        const infEndGame=generalFunctions.updateGame(playerConfig.colorsGame.top,nextPlayer)
        if(infEndGame.endGame){
            this.endGame(infEndGame)
        }
    }

    backPreviousMove(){
        const playHistory = game.getHistoryMoves()
        if(playHistory.length>0){
            game.returnMovement()
            const pastColor=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
            const statusGame = game.getStatusGame() 
            if(statusGame.endGame===false){
                generalFunctions.updateGame(playerConfig.colorsGame.top,pastColor)
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
        viewController.exposeEndGameInformation(endGameType[infEndGame.endGame],infEndGame.colorWin)
    }
}

class onlineGame{
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
                generalFunctions.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
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
                generalFunctions.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor, isPlayable)
                network.enableCalls.moveAdversary()
            }
            network.enableCalls.statusGame()
        }
        else{
            viewController.informationProminent(infCode.msg)
        }
    }
    
    connectionPlayerTwo(infPlayerAdv){
        if(infPlayerAdv.connection===false){
            const noAdv = "noAdv"
            viewController.exposeEndGameInformation(noAdv)
            setTimeout(()=>{
                viewController.hideinformationModal()
                viewController.exposeHomePage()
            },5000)
        }
        else{
            const connection={
                msg: "connected",
                type:"online"
            } 
            viewController.updateStatusConection(connection,infPlayerAdv.namePlayer)
            generalFunctions.updateGame(playerConfig.colorsGame.top,playerConfig.currentPlayerColor)
        }
    }

    move(informationPieceSelect){
        const isMove = generalFunctions.movePiece(informationPieceSelect)
        if(isMove){
            // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
            const infSendMove = network.sendSever.moveGame(informationPieceSelect)
            network.enableCalls.moveAdversary()
        }
        const isPlayable=false
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        const infEndGame=generalFunctions.updateGame(nextPlayer,playerConfig.colorsGame.top,isPlayable)
        if(infEndGame.endGame){
            const endGame={
                endGame:infEndGame.endGame,
                colorWin: infEndGame.endGame.colorWin, 
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
            const isMove = generalFunctions.movePiece(infMoveAdv.move)
            if(isMove){
                // network.sendSever.recMoveGame("true")
            }
            else{
                // enviar caso tiver movimento invalido
                // network.sendSever.recMoveGame("false")
            }
            const nextPlayer=playerConfig.onlinePlayer.color
            const infEndGame=generalFunctions.updateGame(playerConfig.colorsGame.top,nextPlayer)
            if(infEndGame.endGame){
                const endGame={
                    endGame:infEndGame.endGame,
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
            endGame:"giveUp",
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
            giveUp: "giveUp"
        }
        viewController.exposeEndGameInformation(endGameType[infEndGame.endGame],infEndGame.colorWin,infEndGame.namePlayer)
        network.sendSever.endGame()
    }
}

class generalFunctions{
    static updateGame(colorTop,colorPlayer, isPlayable){
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
    
    static movePiece(informationPieceSelect){
        let isMove = false
        if(informationPieceSelect.specialMovement){
            isMove=game.informSpecialMovement(informationPieceSelect)
        }
        else{
            isMove=game.informMove(informationPieceSelect) 
        }  
        return isMove
    }
    
    static updateBoard(colorPlayer,isPlayable=true){
        const chessBoard=game.getCurrentBoard()
        viewController.updateBoard(chessBoard,colorPlayer,isPlayable) 
    }
    
    static updateInformationGame(colorPlayer){  
        let infEndGame ={
            endGame:null,
            colorWin:null
        }
        const statusGame = game.getStatusGame() 
        if(statusGame.checkMate===true){
            const checkMate = "checkMate"
            infEndGame.endGame= "checkMate"
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
            infEndGame.endGame= "draw"
        }
        else if(statusGame.endGame===true ||statusGame.checkMate===true){
            infEndGame.endGame= "endGame"
        }
        if(statusGame.playerWin){
            infEndGame.colorWin=statusGame.playerWin
        }
        return infEndGame
    }
    
    static updateCapturedPiece(colorTop){
        const capturedPieces = game.getCapturedPieces()
        viewController.updateCapturedPieces(colorTop,capturedPieces)
    }
    
    static updatePlaysHistory(){
        const playHistory = game.getHistoryMoves()
        viewController.updateHistory(playHistory)
    }
}