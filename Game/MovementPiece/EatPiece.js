function eatPiece(objOfEatedPiece,capturedPiece=this.capturedPiece){
    const nameCapturePiece = objOfEatedPiece.fullName
    objOfEatedPiece.disablePiece()
    objOfEatedPiece.deletePossibleSpecialMovements()
    capturedPiece.addCapturedPiece(nameCapturePiece,objOfEatedPiece)
}

export default eatPiece