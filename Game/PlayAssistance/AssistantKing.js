import {verifyCheckInFakeBoard,newFakeBoard} from "../FakeChessBoard/index.js"

function assistantKing(assistantPieceColor,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard){
    const nameKing =`King${assistantPieceColor}` 
    const positionInitialKing = piecesBoard.pieces[nameKing].position
    const newRefMovements = piecesBoard.pieces[nameKing].refMovements.reduce((possibleMovementKing,refIdKing)=>{
           const fakeChessBoard = newFakeBoard(positionInitialKing,refIdKing,chessBoard)       
           const checkFakeBoard = verifyCheckInFakeBoard(fakeChessBoard,refIdKing,assistantPieceColor)
           if( checkFakeBoard.isCheck === false){//se na nova refId do rei não tem check, não há checkMate
                possibleMovementKing.push(refIdKing)
           }
           return possibleMovementKing
    },[])
    piecesBoard.pieces[nameKing].changeMovementsPossibilities(newRefMovements)
}

export default assistantKing