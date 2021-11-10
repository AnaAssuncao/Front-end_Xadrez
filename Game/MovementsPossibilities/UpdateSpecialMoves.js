import roque from "./Roque.js"
import enPassant from "./EnPassant.js"
import pawnPromotion from "./PawnPromotion.js"

function updateSpecialMoves(color,statusGame=this.statusGame, specialMovement=this.specialMovement){
    const nextColor = (statusGame.colorPieces.top===color)?statusGame.colorPieces.bottom:statusGame.colorPieces.top
    roque.apply(this,[nextColor])
    enPassant.apply(this,[nextColor])
    pawnPromotion.apply(this)
}

export default updateSpecialMoves