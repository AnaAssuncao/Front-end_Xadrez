export default class CapturedPiece{
    constructor(){
        this.pieces={}
    }
    addCapturedPiece(nameCapturePiece,objOfEatedPiece){
        this.pieces[nameCapturePiece]=objOfEatedPiece
    }
    deleteCapturedPiece(nameCapturePiece){
        delete this.pieces[nameCapturePiece]
    }
}