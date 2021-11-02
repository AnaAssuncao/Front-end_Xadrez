export default class PiecesBoard{
    constructor(){
        this.pieces={ }
    }
    addPieceOfRef(namePiece,piece){
        this.pieces[namePiece]=piece
    }
    changePossibleMovements(namePiece){
        this.pieces[namePiece].refMovements= this.pieces[namePiece].functionPiece()
    }
    addPossibleSpecialMovements(namePiece,newMovements){
        this.pieces[namePiece].possibleSpecialMovements.push(newMovements)
    }
    deletePossibleSpecialMovements(namePiece){
        this.pieces[namePiece].possibleSpecialMovements=[]
    }
}