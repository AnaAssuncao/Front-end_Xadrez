import saveHistory from "../History/index.js"
import makeMovements from "./index.js"

function movementEnPassant(informationPieceToMove,chessBoard=this.chessBoard,specialMovement=this.specialMovement,playHistory=this.playHistory,capturedPiece=this.capturedPiece){
    const enPassant = "enPassant"
    saveHistory.setPlay.apply(this,[[informationPieceToMove],enPassant])
    makeMovements.changePiecePosition.apply(this,[specialMovement.enPassant.pawnInAtack,informationPieceToMove])
    makeMovements.eatPiece(specialMovement.enPassant.pawnPossibleCapture,chessBoard,capturedPiece)
}

export default movementEnPassant