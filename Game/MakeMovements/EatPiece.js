function eatPiece(objOfEatedPiece,chessBoard=this.chessBoard,capturedPiece=this.capturedPiece){
    const nameCapturePiece = objOfEatedPiece.fullName
    objOfEatedPiece.disablePiece()
    objOfEatedPiece.deletePossibleSpecialMovements()
    capturedPiece.addCapturedPiece(nameCapturePiece,objOfEatedPiece)
    chessBoard.deletePieceOfRef(objOfEatedPiece.position)
}

export default eatPiece