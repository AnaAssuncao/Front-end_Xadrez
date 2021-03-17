import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"

const playerConfig={
    functionsGame:null,
    top:"Black",
    bottom:"White",
    currentPlayer:null,
    colorMultiPlayer:null
}
const game = new createGame(playerConfig)
const startboard = game.getCurrentBoard()

const viewController = new ViewController (startboard)
const network = new interfaceNetwork()

viewController.addHomePage()
viewController.subscribeStartSinglePlayer(startSinglePlayer)
viewController.subscribeStartMultiPlayer(startMultiPlayer)

function startSinglePlayer(){
    playerConfig.functionsGame = new offline()
    viewController.subscribeMovePiece(playerConfig.functionsGame.move)
    viewController.subscribeHistory(playerConfig.functionsGame.backPreviousMove)
    viewController.subscribeRestartGame(playerConfig.functionsGame.restartGame)
    playerConfig.functionsGame.start()
}

function startMultiPlayer(infGame){
    playerConfig.functionsGame = new online()
    viewController.subscribeMovePiece(playerConfig.functionsGame.move)
    viewController.subscribeRestartGame(playerConfig.functionsGame.restartGame)
    network.subscribeMoveAdversary(playerConfig.functionsGame.getMoveAdv)
    network.subscribePlayerConnection(playerConfig.functionsGame.connectionPlayerTwo)
    network.subscribeGiveUp(playerConfig.functionsGame.advGiveUp)
    playerConfig.functionsGame.start(infGame)
}

class offline{
    start(){
        viewController.clearHomePage()
        playerConfig.currentPlayer="White"
        const connection={
            msgConnection:"Jogo Local",
            type:"offline"
        }
        viewController.updateStatusConection(connection.type,connection.msgConnection)
        viewController.addBackMovement()
        generalFunctions.startGame(playerConfig.currentPlayer, playerConfig.top)
    }

    move(informationPieceSelect){
        const nextPlayer=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
        const isMove =generalFunctions.movePiece(informationPieceSelect,nextPlayer)
        if(isMove){
            playerConfig.currentPlayer=nextPlayer
        }
    }

    backPreviousMove(){
        const playHistory = game.getHistoryMoves()
        if(playHistory.length>0){
            game.returnMovement()
            const pastColor=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
            const chessBoard=game.getCurrentBoard()
            const statusGame = game.getStatusGame() 
            const capturedPieces = game.getCapturedPieces()
            const playHistory = game.getHistoryMoves()
            if(statusGame.endGame===false){
                generalFunctions.updateBoard(pastColor,chessBoard)        
                generalFunctions.updateInformationGame(pastColor,statusGame)
                generalFunctions.updateCapturedPiece(playerConfig.top,capturedPieces)        
                generalFunctions.updatePlaysHistory(playHistory)   
                playerConfig.currentPlayer=pastColor
            }
        }
    }

    restartGame(){
        playerConfig.functionsGame = null
        playerConfig.currentPlayer= null
        playerConfig.colorMultiPlayer= null
        viewController.clearEndGameInformation()
        viewController.clearBackMovement()
        viewController.addHomePage()
        viewController.clearSubscribes()
    }
}

class online{
    async start(infGame){
        // infGame = {name:value, roomCode:value}
        const infCode= await network.sendSever.infStartGame(infGame)
        if(infCode.connectedServer){
            viewController.clearHomePage()
            if(infCode.playerAdv.connection===false){
                const connection={
                    msgConnection: "Aguardando adversário",
                    type:"online"
                } 
                viewController.updateStatusConection(connection.type,connection.msgConnection)
                playerConfig.colorMultiPlayer="White"
                playerConfig.currentPlayer =playerConfig.colorMultiPlayer
                const isPlayable = false
                generalFunctions.startGame(playerConfig.currentPlayer, playerConfig.top, isPlayable)
                network.enableCalls.playerConnection()
            }
            else{
                const connection={
                    msgConnection: ("Conectado com "+ infCode.playerAdv.namePlayer),
                    type:"online"
                } 
                viewController.updateStatusConection(connection.type,connection.msgConnection)
                playerConfig.colorMultiPlayer="Black"
                playerConfig.currentPlayer="White"
                const isPlayable = false
                generalFunctions.startGame(playerConfig.currentPlayer, playerConfig.top, isPlayable)
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
            viewController.addEndGameInformation("noAdv")
            setTimeout(()=>{
                viewController.clearinformationModal()
                viewController.addHomePage()
            },5000)
        }
        else{
            const connection={
                msgConnection: ("Conectado com "+ infPlayerAdv.namePlayer),
                type:"online"
            } 
            viewController.updateStatusConection(connection.type,connection.msgConnection)
            generalFunctions.startGame(playerConfig.currentPlayer, playerConfig.top)
        }
    }

    move(informationPieceSelect){
        const isPlayable=false
        const nextPlayer=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
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
            const nextPlayer=playerConfig.colorMultiPlayer
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
        playerConfig.functionsGame = null
        playerConfig.currentPlayer= null
        playerConfig.colorMultiPlayer= null
        viewController.clearEndGameInformation()
        viewController.clearBackMovement()
        viewController.addHomePage()
        viewController.clearSubscribes()
    }

    advGiveUp(namePlayer){
        viewController.addEndGameInformation("giveUp",namePlayer)
    }
}

class generalFunctions{
     static startGame(colorPlayer, colorTop, isPlayable){
        game.starObjGame(colorPlayer)
        const chessBoard=game.getCurrentBoard()
        const statusGame = game.getStatusGame() 
        const capturedPieces = game.getCapturedPieces()
        const playHistory = game.getHistoryMoves()
        this.updateBoard(colorPlayer,chessBoard,isPlayable) 
        this.updateInformationGame(colorPlayer,statusGame)
        this.updateCapturedPiece(colorTop,capturedPieces)
        this.updatePlaysHistory(playHistory)   
    }
    
    static movePiece(informationPieceSelect,colorPlayer,isPlayable){
        let isMove = false
        if(informationPieceSelect.specialMovement){
            isMove=game.informSpecialMovement(informationPieceSelect)
        }
        else{
            isMove=game.informMove(informationPieceSelect) 
        }  
        const chessBoard=game.getCurrentBoard()
        const statusGame = game.getStatusGame() 
        const capturedPieces = game.getCapturedPieces()
        const playHistory = game.getHistoryMoves()
        if(statusGame.endGame){
            isPlayable=false
        }
        this.updateBoard(colorPlayer,chessBoard,isPlayable) 
        this.updateInformationGame(colorPlayer,statusGame)
        this.updateCapturedPiece(playerConfig.top,capturedPieces)
        this.updatePlaysHistory(playHistory)   
        return isMove
    }
    
    static updateBoard(colorPlayer,board,isPlayable=true){
        viewController.updateBoard(board,colorPlayer,isPlayable) 
    }
    
    static updateInformationGame(colorPlayer,statusGame){  
        viewController.updateStatusGame(statusGame,colorPlayer)
        if(statusGame.endGame===true && statusGame.checkMate===false){
            const status ={
                endGame:statusGame.endGame,
                playerConfigWin:statusGame.playerConfigWin
            }
            viewController.endGame(status,colorPlayer)
        } 
    }
    
    static updateCapturedPiece(colorTop,capturedPieces){
        viewController.updateCapturedPieces(colorTop,capturedPieces)
    }
    
    static updatePlaysHistory(history){
        viewController.updateHistory(history)
    }
}