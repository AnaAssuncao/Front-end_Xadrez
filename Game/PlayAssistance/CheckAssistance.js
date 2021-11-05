import assistantKing from "./AssistantKing.js"
import {verifyCheckInFakeBoard,newFakeBoard} from "../FakeChessBoard/index.js"

function checkAssistance(assistantPieceColor,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard, statusGame=this.statusGame){
    const nameKing =`King${assistantPieceColor}`
    assistantKing.apply(this,[assistantPieceColor])

    const positionInitialKing = piecesBoard.pieces[nameKing].position
    const arrayNamesPieces = Object.keys(piecesBoard.pieces)
    arrayNamesPieces.forEach((namePiece)=>{
        if((assistantPieceColor=== piecesBoard.pieces[namePiece].color)&&( piecesBoard.pieces[namePiece].isAtive===true)&&(namePiece!==nameKing)){
            piecesBoard.pieces[namePiece].refMovements= piecesBoard.pieces[namePiece].refMovements.reduce((possibleMovementPiece,refIdpiece)=>{
                for(let refIdPossiblePath of statusGame.checkKing.refIdPathsToCheck){
                    if(refIdPossiblePath===refIdpiece){
                        const fakeChessBoard = newFakeBoard( piecesBoard.pieces[namePiece].position,refIdpiece,chessBoard)
                        if(verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,assistantPieceColor) === false){//se na nova refId do rei não tem check, não há checkMate
                            possibleMovementPiece.push(refIdpiece)
                        }                
                    }
                }
                return possibleMovementPiece
            },[])
        }
    })
}   
export default checkAssistance