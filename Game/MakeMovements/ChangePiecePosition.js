import eatPiece from "./EatPiece.js"

function changePiecePosition(objOfMovedPiece,informationPiecetoMove,chessBoard=this.chessBoard,capturedPiece=this.capturedPiece){
    const newRefId = informationPiecetoMove.refId
    if(chessBoard.reference[newRefId]!==null){
        eatPiece(chessBoard.reference[newRefId],chessBoard,capturedPiece)
    }
    chessBoard.deletePieceOfRef(objOfMovedPiece.position)
    objOfMovedPiece.changePosition(newRefId)
    objOfMovedPiece.increaseQtMovements()
    chessBoard.addPieceOfRef(newRefId, objOfMovedPiece)
}

export default changePiecePosition