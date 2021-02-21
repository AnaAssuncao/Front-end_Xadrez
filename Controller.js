import createGame from "./XadrezGame.js"
import ViewController from "./ViewController.js"

const player={
    top:"Black",
    bottom:"White",
    currentMove:null
}

const game = new createGame(player)
const startboard = game.getCurrentBoard()

const viewController = new ViewController (startboard)
let numberPlays = 0

viewController.startGameOffline.subscribe(startOff)
viewController.movePiece.subscribe(movePiece)
viewController.underHistory.subscribe(backPreviousMove)

function startOff(){
    player.currentMove="White"
    start(player.currentMove, player.top)
}

function start(colorInitial, colorTop){
    game.starObjGame(colorInitial)
    const chessBoard=game.getCurrentBoard()
    updateBoard(colorInitial,chessBoard) 
    const statusGame = game.getStatusGame() 
    updateInformationGame(colorInitial,statusGame)
    const capturedPieces = game.getCapturedPieces()
    updateCapturedPiece(colorTop,capturedPieces)
    const playHistory = game.getHistoryMoves()
    updatePlaysHistory(playHistory)   
}

function movePiece(informationPieceSelect){
    const specialMovements =game.verifySpecialMovement(informationPieceSelect)
    if(specialMovements===false){
        const movement=game.verifyMove(informationPieceSelect) 
    }
    const nextPlayer=(player.top===player.currentMove)?player.bottom:player.top
    const chessBoard=game.getCurrentBoard()
    updateBoard(nextPlayer,chessBoard) 
    const statusGame = game.getStatusGame() 
    updateInformationGame(nextPlayer,statusGame)
    const capturedPieces = game.getCapturedPieces()
    updateCapturedPiece(player.top,capturedPieces)
    const playHistory = game.getHistoryMoves()
    updatePlaysHistory(playHistory)   
    player.currentMove=nextPlayer
}

function updateBoard(nextPlayer,board){
    const informationBoard ={
        chessBoard:board,
        playerMove:nextPlayer,
        imgPiecePromotion:game.getImgPiecePromotion(nextPlayer)//deixar constante viewController
    } 
    viewController.updateBoard(informationBoard) 
}

function updateInformationGame(nextPlayer,statusGame){  
    if(statusGame.endGame===true){
        viewController.endGame(statusGame,nextPlayer)
    }
    else{
        viewController.updateStatusGame(statusGame,nextPlayer)
    }      
}

function updateCapturedPiece(colorTop,capturedPieces){
    viewController.updateCapturedPieces(colorTop,capturedPieces)
}

function updatePlaysHistory(history){
    viewController.updateHistory(history)
    numberPlays=history.length
}

function backPreviousMove(){
    const playHistory = game.getHistoryMoves()
    if(playHistory.length>0){
        game.returnMovement()
        player.currentMove=(player.top===player.currentMove)?player.bottom:player.top
        const chessBoard=game.getCurrentBoard()
        updateBoard(nextPlayer,chessBoard) 
        const statusGame = game.getStatusGame() 
        updateInformationGame(nextPlayer,statusGame)
        const capturedPieces = game.getCapturedPieces()
        updateCapturedPiece(player.top,capturedPieces)
        const playHistory = game.getHistoryMoves()
        updatePlaysHistory(playHistory)   
    }
}
