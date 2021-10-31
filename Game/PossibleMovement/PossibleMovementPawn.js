function possibleMovementPawn(chessBoard=this.chessBoard){
    const column=Number(this.position.charAt(3))
    const line =Number(this.position.charAt(4))
    const movementPawn = []
    const direction=[(this.color==this.colorPieceBoard.bottom)?1:-1]
//Peças Pretas aumentam a linha e as Brancas diminuem.
if((line+Number(direction))>=1 && (line+Number(direction))<=8){
    const possibleMovement=`ref${column}${(line+Number(direction))}`
    if(chessBoard[possibleMovement]===null){
        movementPawn.push(possibleMovement)

        if(this.qtMovements==0){
            const fistMovement=`ref${column}${(line+direction*2)}`
            if(chessBoard[fistMovement]===null){
                movementPawn.push(fistMovement)
            }
        }
    }    

    const possibleEat=[`ref${column-1}${(line+Number(direction))}`,`ref${column+1}${(line+Number(direction))}`]
    possibleEat.forEach((position)=>{
        if((chessBoard[position]!==null) && (chessBoard[position]!==undefined) && (chessBoard[position].color!==this.color)){
            movementPawn.push(position)
        }
    })   
}
    return movementPawn
}

export default possibleMovementPawn