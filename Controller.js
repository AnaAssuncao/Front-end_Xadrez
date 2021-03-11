import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"

const playerConfig={
    typeGame:null,
    top:"Black",
    bottom:"White",
    currentPlayer:null,
    colorMultiPlayer:null
}

const game = new createGame(playerConfig)
const startboard = game.getCurrentBoard()

const viewController = new ViewController (startboard)
const network = new interfaceNetwork()

viewController.subscribeStartSinglePlayer(startSinglePlayer)
viewController.subscribeStartMultiPlayer(startMultiPlayer)
viewController.subscribeMovePiece(moveTypeGame)
viewController.subscribeHistory(backPreviousMove)

network.subscribeMoveAdversary(getMoveAdv)
network.subscribePlayerConnection(connectionPlayerTwo)

function startSinglePlayer(){
    playerConfig.currentPlayer="White"
    playerConfig.typeGame="SinglePlayer"
    viewController.clearModalStartGame()
    startGame(playerConfig.currentPlayer, playerConfig.top, playerConfig.currentPlayer)
    viewController.addButtonBackMovement()
}

async function startMultiPlayer(infGame){
    // infGame = {name:value, roomCode:value}
    viewController.clearButtonBackMovement()
    const inf= await network.send.infStartGame(infGame)
    if(inf){
        viewController.clearModalStartGame()
        playerConfig.typeGame="MultiPlayer"
        if(inf.players.playerTwo===null){
            playerConfig.colorMultiPlayer="White"
            network.get.playerConnection()
        }
        else{
            playerConfig.colorMultiPlayer="Black"
            playerConfig.currentPlayer=playerConfig.colorMultiPlayer
            const isPlayerInitial = false
            startGame(playerConfig.currentPlayer, playerConfig.top, isPlayerInitial)
            network.get.moveAdversary()
        }
    }
}

async function connectionPlayerTwo(){
    playerConfig.currentPlayer=playerConfig.colorMultiPlayer
    startGame(playerConfig.currentPlayer, playerConfig.top,playerConfig.colorMultiPlayer)
}

function startGame(colorPlayer, colorTop, playerInitial){
    game.starObjGame(colorPlayer)
    const chessBoard=game.getCurrentBoard()
    const statusGame = game.getStatusGame() 
    const capturedPieces = game.getCapturedPieces()
    const playHistory = game.getHistoryMoves()
    updateBoard(playerInitial,chessBoard,colorPlayer) 
    updateInformationGame(colorPlayer,statusGame)
    updateCapturedPiece(colorTop,capturedPieces)
    updatePlaysHistory(playHistory)   
}

function moveTypeGame(informationPieceSelect){
    if(playerConfig.typeGame==="SinglePlayer"){
        const nextPlayer=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
        const isMove = movePiece(informationPieceSelect,nextPlayer,nextPlayer)
        if(isMove){
            playerConfig.currentPlayer=nextPlayer
        }
    }
    else if(playerConfig.typeGame==="MultiPlayer"){
        const isNextPlayer=false
        const isMove = movePiece(informationPieceSelect,isNextPlayer,playerConfig.colorMultiPlayer)
        if(isMove){
            network.send.moveGame(informationPieceSelect)
            network.get.moveAdversary()
        }
    }
}

function getMoveAdv(informationPieceSelect){
    const nextPlayer=playerConfig.colorMultiPlayer
        const isMove = movePiece(informationPieceSelect,nextPlayer,playerConfig.colorMultiPlayer)
        if(isMove){
            // network.send.recMoveGame("true")
        }
        else{
            // enviar caso tiver movimento invalido
            // network.send.recMoveGame("false")
        }
}

function movePiece(informationPieceSelect,nextPlayer,colorPlayer){
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
    updateBoard(nextPlayer,chessBoard,colorPlayer) 
    updateInformationGame(nextPlayer,statusGame)
    updateCapturedPiece(playerConfig.top,capturedPieces)
    updatePlaysHistory(playHistory)   
    return isMove
}

function updateBoard(nextPlayer,board,colorPlayer){
    viewController.updateBoard(board,nextPlayer,colorPlayer) 
}

function updateInformationGame(nextPlayer,statusGame){  
    if(statusGame.endGame===true){
        const status ={
            endGame:statusGame.endGame,
            playerConfigWin:statusGame.playerConfigWin
        }
        viewController.endGame(status,nextPlayer)
    }
    viewController.updateStatusGame(statusGame,nextPlayer)
}

function updateCapturedPiece(colorTop,capturedPieces){
    viewController.updateCapturedPieces(colorTop,capturedPieces)
}

function updatePlaysHistory(history){
    viewController.updateHistory(history)
}

function backPreviousMove(){
    const playHistory = game.getHistoryMoves()
    if(playHistory.length>0){
        game.returnMovement()
        const pastColor=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
        const chessBoard=game.getCurrentBoard()
        const statusGame = game.getStatusGame() 
        const capturedPieces = game.getCapturedPieces()
        const playHistory = game.getHistoryMoves()
        updateBoard(pastColor,chessBoard,pastColor)       
        updateInformationGame(pastColor,statusGame)
        updateCapturedPiece(playerConfig.top,capturedPieces)        
        updatePlaysHistory(playHistory)   
        playerConfig.currentPlayer=pastColor
    }
}
