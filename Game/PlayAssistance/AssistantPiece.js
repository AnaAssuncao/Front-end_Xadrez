import {verifyCheckInFakeBoard,newFakeBoard} from "../FakeChessBoard/index.js"

function  assistantPiece(assistantPieceColor,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard){
    const nameKing =`King${assistantPieceColor}`
    const positionInitialKing = piecesBoard.pieces[nameKing].position
    const arrayNamesPieces = Object.keys(piecesBoard.pieces)
    arrayNamesPieces.forEach((namePiece)=>{
        if((assistantPieceColor=== piecesBoard.pieces[namePiece].color)&&( piecesBoard.pieces[namePiece].isAtive===true)&&(namePiece!==nameKing)){ 
            const fakeChessBoard= {reference:{...chessBoard.reference}} 
            const positionPiece = piecesBoard.pieces[namePiece].position
            fakeChessBoard.reference[positionPiece]=null
            if(verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,assistantPieceColor)){//se na nova refId do rei não tem check, não há checkMat
                piecesBoard.pieces[namePiece].refMovements=[]
                // pode matar a peça 
            }  
        }
    }
)}

export default assistantPiece