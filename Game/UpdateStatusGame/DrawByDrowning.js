function  drawByDrowning(piecesBoard=this.piecesBoard, statusGame=this.statusGame){
    if(statusGame.checkKing.check===false){
        for(let piece in piecesBoard.pieces){
            if( piecesBoard.pieces[piece].color===statusGame.colorPieces.play){
                if( piecesBoard.pieces[piece].refMovements.length>0){
                    return false
                }
            }
        }
        return true
    }  
    return false   
}

export default drawByDrowning