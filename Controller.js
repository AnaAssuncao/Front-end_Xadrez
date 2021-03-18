import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"

const playerConfig={
    functionsGame:null,
    top:"Black", //colorTop
    bottom:"White", //colorBottom
    currentPlayer:null, //colorcurrentPlayer
    colorMultiPlayer:null
}
const game = new createGame(playerConfig)
const startBoard = game.getCurrentBoard()

const viewController = new ViewController (startBoard)
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
            msg:"place",
            type:"offline"
        }
        viewController.updateStatusConection(connection)
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
            const statusGame = game.getStatusGame() 
            if(statusGame.endGame===false){
                generalFunctions.updateBoard(pastColor)        
                generalFunctions.updateInformationGame(pastColor)
                generalFunctions.updateCapturedPiece(playerConfig.top)        
                generalFunctions.updatePlaysHistory()   
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
                    msg: "wait",
                    type:"online"
                } 
                viewController.updateStatusConection(connection)
                playerConfig.colorMultiPlayer="White"
                playerConfig.currentPlayer =playerConfig.colorMultiPlayer
                const isPlayable = false
                generalFunctions.startGame(playerConfig.currentPlayer, playerConfig.top, isPlayable)
                network.enableCalls.playerConnection()
            }
            else{
                const connection={
                    msg: "connected",
                    type:"online"
                } 
                viewController.updateStatusConection(connection,infCode.playerAdv.namePlayer)
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
                msg: "connected",
                type:"online"
            } 
            viewController.updateStatusConection(connection,infPlayerAdv.namePlayer)
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
        this.updateCapturedPiece(playerConfig.top)
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