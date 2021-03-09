import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"

const playerConfig={
    top:"Black",
    bottom:"White",
    currentPlayer:null
}

const game = new createGame(playerConfig)
const startboard = game.getCurrentBoard()

const viewController = new ViewController (startboard)
const network = new interfaceNetwork()

viewController.subscribeStartSinglePlayer(startSinglePlayer)
viewController.subscribeStartMultiPlayer(startMultiPlayer)
viewController.subscribeMovePiece(movePiece)
viewController.subscribeHistory(backPreviousMove)

function startSinglePlayer(){
    playerConfig.currentPlayer="White"
    viewController.clearModalStartGame()
    startGame(playerConfig.currentPlayer, playerConfig.top)
}

async function startMultiPlayer(infGame){
    const inf= await network.send.infStartGame(infGame)
    if(inf){
        viewController.clearModalStartGame()
    }
    console.log(inf)
}

function startGame(colorInitial, colorTop){
    game.starObjGame(colorInitial)
    const chessBoard=game.getCurrentBoard()
    const statusGame = game.getStatusGame() 
    const capturedPieces = game.getCapturedPieces()
    const playHistory = game.getHistoryMoves()
    updateBoard(colorInitial,chessBoard) 
    updateInformationGame(colorInitial,statusGame)
    updateCapturedPiece(colorTop,capturedPieces)
    updatePlaysHistory(playHistory)   
}

function movePiece(informationPieceSelect){
    if(informationPieceSelect.specialMovement){
        const specialMovements = game.informSpecialMovement(informationPieceSelect)
    }
    else{
        const movement=game.informMove(informationPieceSelect) 
    }
    const nextPlayer=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
    const chessBoard=game.getCurrentBoard()
    const statusGame = game.getStatusGame() 
    const capturedPieces = game.getCapturedPieces()
    const playHistory = game.getHistoryMoves()
    updateBoard(nextPlayer,chessBoard) 
    updateInformationGame(nextPlayer,statusGame)
    updateCapturedPiece(playerConfig.top,capturedPieces)
    updatePlaysHistory(playHistory)   
    playerConfig.currentPlayer=nextPlayer
}

function updateBoard(nextPlayer,board){
    viewController.updateBoard(board,nextPlayer) 
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
        updateBoard(pastColor,chessBoard)       
        updateInformationGame(pastColor,statusGame)
        updateCapturedPiece(playerConfig.top,capturedPieces)        
        updatePlaysHistory(playHistory)   
        playerConfig.currentPlayer=pastColor
    }
}
