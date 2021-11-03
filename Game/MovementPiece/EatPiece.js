function eatPiece(objOfEatedPiece,capturedPiece=this.capturedPiece){
    const nameCapturePiece = objOfEatedPiece.fullName
    objOfEatedPiece.disablePiece()
    objOfEatedPiece.deletePossibleSpecialMovements()
    capturedPiece.pieces[nameCapturePiece]= objOfEatedPiece
    // tirar 
    if(nameCapturePiece==="KingWhite"||nameCapturePiece==="KingBlack"){
        this.statusGame.endGame=true
        this.statusGame.winColor=(this.colorPieceBoard.top===this.colorPieceBoard.play)?this.colorPieceBoard.bottom:this.colorPieceBoard.top 
    }
}

export default eatPiece