import {verifyCheckInFakeBoard,newFakeBoard} from "../FakeChessBoard/index.js"

function  assistantPiece(assistantPieceColor,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard){
    const nameKing =`King${assistantPieceColor}`
    const positionInitialKing = piecesBoard.pieces[nameKing].position
    const arrayNamesPieces = Object.keys(piecesBoard.pieces)
    arrayNamesPieces.forEach((namePiece)=>{
        const piece = piecesBoard.pieces[namePiece]
        if((assistantPieceColor=== piece.color)&&( piece.isAtive===true)&&(namePiece!==nameKing)){ 
            const fakeChessBoard= {reference:{...chessBoard.reference}} 
            const positionPiece = piece.position
            fakeChessBoard.reference[positionPiece]=null
            const checkFakeBoard = verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,assistantPieceColor)
            if(checkFakeBoard.isCheck===true){//se na nova refId do rei não tem check, não há checkMat
                if(piece.refMovements.includes(checkFakeBoard.pieceAttack.position)){
                    piece.changeMovementsPossibilities([checkFakeBoard.pieceAttack.position])
                }
                else{
                    piece.changeMovementsPossibilities([])
                }
            }  
        }
    }
)}

export default assistantPiece