import createGame from "./XadrezGame.js"
import ViewController from "./ViewController.js"

const player={
    top:"Black",
    bottom:"White",
    play:null
}

const game = new createGame(player)
const startboard = game.getCurrentBoard()

const viewController = new ViewController (startboard)
let numberPlays = 0

viewController.startGameOffline.subscribe(start)
viewController.movePiece.subscribe(movePiece)
function start(){
    player.play="White"
    game.starObjGame(player.play)
    if(playHistory.length>0){
        numberPlays = 0
    } 
    allUpdates()
}

function movePiece(informationPieceSelect){
    game.verifyMove(informationPieceSelect) 
    if(informationPieceSelect.piecePromotion){
        informationPieceSelect.piecePromotion= informationPieceSelect.piecePromotion.replace("img/","")
        game.updatePiecePromotion(informationPieceSelect.piecePromotion)  
    }
    allUpdates()
    player.play=(player.top===informationPieceSelect.color)?player.bottom:player.top
}

function updateCapturedPiece(){
    const capturedPieces = game.getCapturedPieces()
    viewController.updateCapturedPieces(capturedPieces,player)
}

function updateBoard(){
    const board ={
        chessBoard:game.getCurrentBoard(),
        playerMove:player.play,
        imgPiecePromotion:game.getImgPiecePromotion(player.play)
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

function allUpdates(){
    updateBoard() 
    updateCapturedPiece()
    updateInformationGame()
}
