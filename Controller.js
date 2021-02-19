import createGame from "./XadrezGame.js"
import ViewController from "./ViewController.js"

const player={
    top:"Black",
    bottom:"White",
    move:null
}

const game = new createGame(player)
const startboard = game.getCurrentBoard()

const viewController = new ViewController (startboard)
let numberPlays = 0

viewController.startGameOffline.subscribe(start)
viewController.movePiece.subscribe(movePiece)
viewController.underHistory.subscribe(backPreviousMove)

function start(){
    player.move="White"
    game.starObjGame(player.move)
    allUpdates()
}

function movePiece(informationPieceSelect){
    game.verifyMove(informationPieceSelect) 
    if(informationPieceSelect.piecePromotion){
        informationPieceSelect.piecePromotion= informationPieceSelect.piecePromotion.replace("img/","")
        game.updatePiecePromotion(informationPieceSelect.piecePromotion)  
    }
    player.move=(player.top===player.move)?player.bottom:player.top
    allUpdates()   
}

function updateCapturedPiece(){
    const capturedPieces = game.getCapturedPieces()
    viewController.updateCapturedPieces(capturedPieces,player)
}

function updateBoard(){
    const board ={
        chessBoard:game.getCurrentBoard(),
        playerMove:player.move,
        imgPiecePromotion:game.getImgPiecePromotion(player.move)
    } 
    viewController.updateBoard(board) 
}

function updateInformationGame(){
    const statusGame = game.getStatusGame()
    if(statusGame.endGame===true){
        viewController.endGame(statusGame)
    }
    else{
        viewController.updateStatusGame(statusGame)
    }      
}

function updatePlaysHistory(){
    const playHistory = game.getHistoryMoves()
    const history = {
        plays:playHistory,
    }
    viewController.updateHistory(history)
    numberPlays=playHistory.length
}

function allUpdates(){
    updateBoard() 
    updateCapturedPiece()
    updateInformationGame()
    updatePlaysHistory()
}

function backPreviousMove(){
    const playHistory = game.getHistoryMoves()
    if(playHistory.length>0){
        game.returnMovement()
        player.move=(player.top===player.move)?player.bottom:player.top
        allUpdates()
    }
}
