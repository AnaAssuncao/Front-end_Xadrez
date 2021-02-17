import createGame from "./XadrezGame.js"
import ViewController from "./ViewController.js"

const game = new createGame()
const chessBoard = game.getCurrentBoard()
const viewController = new ViewController (chessBoard)
let numberPlays = 0

const player={
    top:null,
    bottom:null,
    play:null
}

viewController.startGameOffline.subscribe(start)

function start(){
    player.play="White"
    game.starObjGame(player.play)
    const chessBoard = game.getCurrentBoard()
    viewController.updateBoard(chessBoard,player.play)

    // if(playHistory.length>0){
    //     view.playHitory.clearPlays()
    //     numberPlays = 0
    // } irformar no cv 

    // update capturedPiece
}

function updateCapturedPiece(){
    const capturedPieces = game.getCapturedPieces()
    viewController.updateCapturedPieces(capturePieces,player)
}

function updateInformationGame(){
    const statusGame = game.getStatusGame()
    viewController.updateStatusGame(statusGame)
       
}

