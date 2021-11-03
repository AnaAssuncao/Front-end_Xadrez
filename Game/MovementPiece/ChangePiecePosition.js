import eatPiece from "./EatPiece.js"
function changePiecePosition(objOfMovedPiece,informationPiecetoMove,chessBoard=this.chessBoard,capturedPiece=this.capturedPiece){
    const newRefId = informationPiecetoMove.refId
    if(chessBoard.reference[newRefId]!==null){
        eatPiece(chessBoard.reference[newRefId],capturedPiece)
    }
    chessBoard.reference[objOfMovedPiece.position]=null
    objOfMovedPiece.position=newRefId
    objOfMovedPiece.qtMovements++
    chessBoard.reference[newRefId]= objOfMovedPiece
}

export default changePiecePosition