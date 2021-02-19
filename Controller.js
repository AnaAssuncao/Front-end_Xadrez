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
    const board ={
        chessBoard:game.getCurrentBoard(),
        playerMove:player.play
    } 
    viewController.updateBoard(board)

    // if(playHistory.length>0){
    //     view.playHitory.clearPlays()
    //     numberPlays = 0
    // } irformar no cv 

    // update capturedPiece
}

function movePiece(informationPieceSelect){
    game.verifyMove(informationPieceSelect) 
    if(informationPieceSelect.piecePromotion){
        informationPieceSelect.piecePromotion= informationPieceSelect.piecePromotion.replace("img/","")
        game.updatePiecePromotion(informationPieceSelect.piecePromotion)  
    }
    const board ={
        chessBoard:game.getCurrentBoard(),
        playerMove:player.play,
        imgPiecePromotion:game.getImgPiecePromotion(player.play)
    } 
    viewController.updateBoard(board) 
    player.play=(player.top===informationPieceSelect.color)?player.bottom:player.top 
}

function updateCapturedPiece(){
    const capturedPieces = game.getCapturedPieces()
    viewController.updateCapturedPieces(capturePieces,player)
}

function updateInformationGame(){
    const statusGame = game.getStatusGame()
    viewController.updateStatusGame(statusGame)
       
}

