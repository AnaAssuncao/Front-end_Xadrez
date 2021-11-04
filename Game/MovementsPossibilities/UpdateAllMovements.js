function  updateAllMovements(piecesBoard= this.piecesBoard){
    for(let namePiece in piecesBoard.pieces){
        const piece = piecesBoard.pieces[namePiece]
        if(piece.isAtive===true) {
            piece.changePossibleMovements()
            piece.deletePossibleSpecialMovements()
        }
    }
}

export default updateAllMovements