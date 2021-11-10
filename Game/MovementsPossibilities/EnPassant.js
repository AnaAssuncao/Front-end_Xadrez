import { refIdToArray } from "../utils.js"

function enPassant(nextColor,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard,playHistory=this.playHistory,specialMovement=this.specialMovement,statusGame=this.statusGame){
    if(playHistory.history.length>0){
        const qtMovement=playHistory.history.length-1
        const lastPlayedInHistory=playHistory.history[qtMovement]
        if(lastPlayedInHistory.piecesPlayed.length===1){
            const lastPieceMove=lastPlayedInHistory.piecesPlayed[0]
            if(lastPieceMove.name.includes("Pawn") && lastPieceMove.qtMovements===0){
                const directionLastPawn =(lastPieceMove.color==statusGame.colorPieces.bottom)?1:-1
                const positionLastPawn= refIdToArray(lastPieceMove.position)
                const newPositionPawn= refIdToArray( piecesBoard.pieces[lastPieceMove.fullName].position)
                if((positionLastPawn[1]+(directionLastPawn*2))===newPositionPawn[1]){
                    const positionInAtackLeft = `ref${(newPositionPawn[0]-1)}${newPositionPawn[1]}`
                    if(!!chessBoard.reference[positionInAtackLeft]){
                        if(chessBoard.reference[positionInAtackLeft].fullName.includes("Pawn") && chessBoard.reference[positionInAtackLeft].color===nextColor){
                            possibleMovementEnPassant(lastPieceMove,directionLastPawn,positionInAtackLeft,chessBoard,piecesBoard,specialMovement)
                        }
                    }
                    const positionInAtackRigth = `ref${(newPositionPawn[0]+1)}${newPositionPawn[1]}`
                    if(!!chessBoard.reference[positionInAtackRigth]){
                        if(chessBoard.reference[positionInAtackRigth].fullName.includes("Pawn") && chessBoard.reference[positionInAtackRigth].color===nextColor){
                            possibleMovementEnPassant(lastPieceMove,directionLastPawn,positionInAtackRigth,chessBoard,piecesBoard,specialMovement)
                        }
                    }
                }
            }
        }         
    }  
}

function possibleMovementEnPassant(lastPieceMove,direction,positionInAtack,chessBoard=this.chessBoard,piecesBoard=this.piecesBoard,specialMovement=this.specialMovement){
    const movement = refIdToArray(lastPieceMove.position)
    const newMovementPiece= `ref${movement[0]}${movement[1]+direction}`
    const pawnPossibleCapture= piecesBoard.pieces[lastPieceMove.fullName]
    const pawnInAtack=chessBoard.reference[positionInAtack]
    specialMovement.addEnPassantMovement(true,pawnPossibleCapture,newMovementPiece,pawnInAtack)
    pawnInAtack.changeMovementsPossibilities([...pawnInAtack.refMovements,newMovementPiece])
    const specialEnPassant = {
        positions: specialMovement.enPassant.refIdAtack,
        type:"enPassant"
    }
    pawnInAtack.addPossibleSpecialMovements(specialEnPassant)
}

export default enPassant