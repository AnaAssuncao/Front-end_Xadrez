import { refIdToArray } from "../utils.js"

function pawnPromotion(piecesBoard=this.piecesBoard,specialMovement=this.specialMovement,statusGame=this.statusGame){

    for(let namePawn in piecesBoard.pieces){
        if(namePawn.includes("Pawn")){
            const pawn = piecesBoard.pieces[namePawn]
            const positionPawn = refIdToArray( pawn.position)
            const directionPawn =( pawn.color==statusGame.colorPieces.bottom)?1:-1
            if((positionPawn[1]+directionPawn)===8 ||(positionPawn[1]+directionPawn)===1){
                debugger
                possiblePawnPromotion(namePawn,pawn,positionPawn,directionPawn,specialMovement)
            }
        }
    }
}

function possiblePawnPromotion(namePawn,pawn,positionPawn,directionPawn,specialMovement=this.specialMovement){
    if(!specialMovement.pawnPromotion.namesPawn.includes(namePawn)){
        specialMovement.addPawnPromotion(pawn,namePawn)
        const refId=[]
        const squareLeft = `ref${positionPawn[0]-1}${positionPawn[1]+directionPawn}`
        if( pawn.refMovements.includes(squareLeft)){
            refId.push(squareLeft)
        }
        const squareRight = `ref${positionPawn[0]+1}${positionPawn[1]+directionPawn}`
        if( pawn.refMovements.includes(squareRight)){
            refId.push(squareRight)
        }
        const specialPawnPromotion = {
            positions: refId,
            type:"piecePromotion"
        }
        console.log(specialMovement.pawnPromotion)
        pawn.addPossibleSpecialMovements(specialPawnPromotion)
    }
}

export default pawnPromotion