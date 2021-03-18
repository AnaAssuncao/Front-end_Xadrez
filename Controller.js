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
    onlinePlayerColor:null
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
    moveAdv:function(){
        playerConfig.game.getMoveAdv()
    },
    playerConnection:function(){
        playerConfig.game.connectionPlayerTwo()
    },
    giveUp:function(){
        playerConfig.game.advGiveUp()
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
        generalFunctions.updateGame(playerConfig.currentPlayerColor, playerConfig.colorsGame.top)
    }

    move(informationPieceSelect){
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        const isMove =generalFunctions.movePiece(informationPieceSelect,nextPlayer)
        if(isMove){
            playerConfig.currentPlayerColor=nextPlayer
        }
    }

    backPreviousMove(){
        const playHistory = game.getHistoryMoves()
        if(playHistory.length>0){
            game.returnMovement()
            const pastColor=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
            const statusGame = game.getStatusGame() 
            if(statusGame.endGame===false){
                generalFunctions.updateGame(pastColor, playerConfig.colorsGame.top)
                playerConfig.currentPlayerColor=pastColor
            }
        }
    }

    restartGame(){
        playerConfig.game = null
        playerConfig.currentPlayerColor= null
        playerConfig.onlinePlayerColor= null
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.exposeHomePage()
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
                playerConfig.onlinePlayerColor="White"
                playerConfig.currentPlayerColor =playerConfig.onlinePlayerColor
                const isPlayable = false
                game.starObjGame(playerConfig.currentPlayerColor)
                generalFunctions.updateGame(playerConfig.currentPlayerColor, playerConfig.colorsGame.top, isPlayable)
                network.enableCalls.playerConnection()
            }
            else{
                const connection={
                    msg: "connected",
                    type:"online"
                } 
                viewController.updateStatusConection(connection,infCode.playerAdv.namePlayer)
                playerConfig.onlinePlayerColor="Black"
                playerConfig.currentPlayerColor="White"
                const isPlayable = false
                generalFunctions.updateGame(playerConfig.currentPlayerColor, playerConfig.colorsGame.top, isPlayable)
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
            viewController.exposeEndGameInformation("noAdv")
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
            generalFunctions.updateGame(playerConfig.currentPlayerColor, playerConfig.colorsGame.top)
        }
    }

    move(informationPieceSelect){
        const isPlayable=false
        const nextPlayer=(playerConfig.colorsGame.top===playerConfig.currentPlayerColor)?playerConfig.colorsGame.bottom:playerConfig.colorsGame.top
        const isMove = generalFunctions.movePiece(informationPieceSelect,nextPlayer,isPlayable)
        if(isMove){
            // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
            const infSendMove = network.sendSever.moveGame(informationPieceSelect)
            network.enableCalls.moveAdversary()
        }
    }

    getMoveAdv(informationPieceSelect){
        if(informationPieceSelect===false){
            viewController.informationProminent(infCode.msg)
        }
        else{
            const nextPlayer=playerConfig.onlinePlayerColor
            const isMove = generalFunctions.movePiece(informationPieceSelect,nextPlayer)
            if(isMove){
                // network.sendSever.recMoveGame("true")
            }
            else{
                // enviar caso tiver movimento invalido
                // network.sendSever.recMoveGame("false")
            }
        }
    }

    restartGame(){
        network.sendSever.giveUp()
        playerConfig.game = null
        playerConfig.currentPlayerColor= null
        playerConfig.onlinePlayerColor= null
        viewController.hideEndGameInformation()
        viewController.hideBackMovement()
        viewController.exposeHomePage()
    }

    advGiveUp(namePlayer){
        viewController.exposeEndGameInformation("giveUp",namePlayer)
    }
}

class generalFunctions{
    static updateGame(colorPlayer, colorTop, isPlayable){
        this.updateBoard(colorPlayer,isPlayable) 
        this.updateInformationGame(colorPlayer)
        this.updateCapturedPiece(colorTop)
        this.updatePlaysHistory()   
    }
    
    static movePiece(informationPieceSelect,colorPlayer,isPlayable){
        let isMove = false
        if(informationPieceSelect.specialMovement){
            isMove=game.informSpecialMovement(informationPieceSelect)
        }
        else{
            isMove=game.informMove(informationPieceSelect) 
        }  
        const statusGame = game.getStatusGame() 
        if(statusGame.endGame){
            isPlayable=false
        }
        this.updateBoard(colorPlayer,isPlayable) 
        this.updateInformationGame(colorPlayer)
        this.updateCapturedPiece(playerConfig.colorsGame.top)
        this.updatePlaysHistory()   
        return isMove
    }
    
    static updateBoard(colorPlayer,isPlayable=true){
        const chessBoard=game.getCurrentBoard()
        viewController.updateBoard(chessBoard,colorPlayer,isPlayable) 
    }
    
    static updateInformationGame(colorPlayer){  
        const statusGame = game.getStatusGame() 
        viewController.updateStatusGame(statusGame,colorPlayer)
        if(statusGame.endGame===true && statusGame.checkMate===false){
            const status ={
                endGame:statusGame.endGame,
                playerConfigWin:statusGame.playerConfigWin
            }
            viewController.endGame(status,colorPlayer)
        } 
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