import createObjHistory from "../PlayHistory/CreateObjHistory.js"
import createNewPieces from "../CreateNewPieces/index.js"
import makeMovements from "./index.js"

function  movementPawnPromotion(informationPieceToMove,piecesBoard=this.piecesBoard,playHistory=this.playHistory,piecesPromotion=this.piecesPromotion){
    const pawn = piecesBoard.pieces[informationPieceToMove.fullName]
    debugger
    const informationPawnToMove={
        fullName: pawn.fullName,
        refId:informationPieceToMove.refId
    }  
    createNewPieces.piecePromotion.apply(this,[informationPieceToMove,pawn])
    const informationPiecePromotion={
        fullName: piecesPromotion.newPiece.fullName,
        refId:informationPieceToMove.refId
    }  
    const piecePromotion = "piecePromotion"
    const objHistory =createObjHistory.apply(this,[[informationPawnToMove,informationPiecePromotion],piecePromotion])
    playHistory.setHistory(objHistory)
    changePiecePromotion.apply(this,[pawn,informationPawnToMove])
}

function changePiecePromotion(pawn,informationPawnToMove,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard,piecesPromotion=this.piecesPromotion){
    makeMovements.changePiecePosition.apply(this,[pawn,informationPawnToMove])
    const newPiece=piecesPromotion.newPiece
    piecesBoard.addPieceOfRef(newPiece.fullName,newPiece)
    pawn.disablePiece()
    chessBoard.addPieceOfRef(newPiece.position,newPiece)
}

export default movementPawnPromotion