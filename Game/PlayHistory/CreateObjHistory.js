function createObjHistory(arrayPiece,typeMovement,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard,specialMovement=this.specialMovement,piecesPromotion=this.piecesPromotion){
    const movement={
        piecesPlayed:[],
        pieceCaptured:null,
        newRefId:[],
        typeMovement:null
    }
    arrayPiece.forEach(piece=> {
        if( piecesBoard.pieces[piece.fullName]){
            movement.piecesPlayed.push({__proto__:this,
                ... piecesBoard.pieces[piece.fullName]})   
            if(chessBoard.reference[piece.refId]!==null){
                movement.pieceCaptured={__proto__:this,
                    ... piecesBoard.pieces[chessBoard.reference[piece.refId].fullName]}
            }
            if(typeMovement==="enPassant"){
                movement.pieceCaptured={__proto__:this,
                    ... piecesBoard.pieces[specialMovement.enPassant.pawnPossibleCapture.fullName]}
            }
        }
        else if(typeMovement==="piecePromotion" ){
            movement.piecesPlayed.push({__proto__:this,
                 ...piecesPromotion.newPiece})
        }
        movement.newRefId.push(piece.refId)
    })
    movement.typeMovement=typeMovement
 
    return movement
}

export default createObjHistory