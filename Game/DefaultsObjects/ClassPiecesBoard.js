export default class PiecesBoard{
    constructor(){
        this.pieces={ }
    }
    addPieceOfRef(namePiece,piece){
        this.pieces[namePiece]=piece
    }
    deletePiece(){
        delete this.pieces[namePiece]
    }
}