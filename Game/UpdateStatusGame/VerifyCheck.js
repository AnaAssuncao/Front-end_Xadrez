import {movementsPieceAdversity} from "../utils.js"

function verifyCheck(refIdKing,colorKing,piecesBoard=this.piecesBoard){
    let checks = {
        qt:0,
        pieceCheck:null
    }
    for(let piece in piecesBoard.pieces){
        if((colorKing!== piecesBoard.pieces[piece].color)&&( piecesBoard.pieces[piece].isAtive===true)){
            if(movementsPieceAdversity (piecesBoard.pieces[piece].refMovements,refIdKing)){
                checks.qt++
                checks.pieceCheck=piece
            }
        }
    }
    return checks
}

export default verifyCheck