function movementsPossibilitiesPawn(chessBoard=this.chessBoard,bottomPieceColor=this.colorPieceBoard.bottom,color=this.color, position=this.position,qtMovements=this.qtMovements){
    const column=Number(position.charAt(3))
    const line =Number(position.charAt(4))
    const movementPawn = []
    const direction=[(color==bottomPieceColor)?1:-1]
//Peças Pretas aumentam a linha e as Brancas diminuem.
if((line+Number(direction))>=1 && (line+Number(direction))<=8){
    const movementsPossibilities=`ref${column}${(line+Number(direction))}`
    if(chessBoard.reference[movementsPossibilities]===null){
        movementPawn.push(movementsPossibilities)

        if(qtMovements==0){
            const fistMovement=`ref${column}${(line+direction*2)}`
            if(chessBoard.reference[fistMovement]===null){
                movementPawn.push(fistMovement)
            }
        }
    }    

    const possibleEat=[`ref${column-1}${(line+Number(direction))}`,`ref${column+1}${(line+Number(direction))}`]
    possibleEat.forEach((position)=>{
        if((chessBoard.reference[position]!==null) && (chessBoard.reference[position]!==undefined) && (chessBoard.reference[position].color!==color)){
            movementPawn.push(position)
        }
    })   
}
    return movementPawn
}

export default movementsPossibilitiesPawn