export default class PiecesPromotion{
    constructor(){
        this.chancePiece=false,
        this.promotedPawn=null,
        this.color=null,
        this.qtPiece={
            black:[1,1,1,1],
            white:[1,1,1,1],
        }
        this.newPiece=null
    }
    addPiecesPromotion(color,newPiece,qtMovements,indChangePiece){
        this.newPiece=newPiece
        this.newPiece.changeMovementsPossibilities(qtMovements)
        this.qtPiece[color][indChangePiece]++
    }
}
