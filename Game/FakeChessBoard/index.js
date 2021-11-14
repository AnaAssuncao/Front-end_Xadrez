import {movementsPieceAdversity} from "../utils.js"

function  newFakeBoard(pastPositionPiece,newPositionPiece,chessBoard=this.chessBoard){
    const fakeChessBoard= {reference:{...chessBoard.reference}} 
    const pieceMove = fakeChessBoard.reference[pastPositionPiece]
    fakeChessBoard.reference[newPositionPiece] = pieceMove
    fakeChessBoard.reference[pastPositionPiece]=null
    return fakeChessBoard
}

function verifyCheckInFakeBoard(fakeChessBoard,newRefIdKing,colorKing){
    for(let refId in fakeChessBoard.reference){
        if(fakeChessBoard.reference[refId]!==null && fakeChessBoard.reference[refId].color!==colorKing && fakeChessBoard.reference[refId].isAtive)
        {
            const refMovements=fakeChessBoard.reference[refId].functionPiece(fakeChessBoard)
            if(movementsPieceAdversity(refMovements,newRefIdKing)){//verifica se o refId adversario e igual ao refId do rei
                //se for verdadeiro o rei esta em check, movimento para morte
                return {
                    isCheck:true,
                    pieceAttack:fakeChessBoard.reference[refId]
                }
            }
        }
    }
    return  {
        isCheck:false,
        pieceAttack:null
    }
}


export {verifyCheckInFakeBoard,newFakeBoard}

