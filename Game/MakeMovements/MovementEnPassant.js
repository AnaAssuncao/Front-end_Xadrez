import createObjHistory from "../PlayHistory/CreateObjHistory.js"
import makeMovements from "./index.js"

function movementEnPassant(informationPieceToMove,chessBoard=this.chessBoard,specialMovement=this.specialMovement,playHistory=this.playHistory,capturedPiece=this.capturedPiece){
    const enPassant = "enPassant"
    const objHistory = createObjHistory.apply(this,[[informationPieceToMove],enPassant])
    playHistory.setHistory(objHistory)
    makeMovements.changePiecePosition.apply(this,[specialMovement.enPassant.pawnInAtack,informationPieceToMove])
    makeMovements.eatPiece(specialMovement.enPassant.pawnPossibleCapture,chessBoard,capturedPiece)
}

export default movementEnPassant