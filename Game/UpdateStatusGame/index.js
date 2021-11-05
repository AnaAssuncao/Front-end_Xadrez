import verifyEndGame from "./VerifyEndGame.js"
import updateStatusCheck from "./UpdateStatusCheck.js"
import verifyCheck from "./VerifyCheck.js"
import verifyCheckMate from "./VerifyCheckMate.js"

function verifyStatusGame(colorMove,statusGame=this.statusGame,capturedPiece=this.capturedPiece,colorPieceBoard=this.colorPieceBoard){
    const endGame = verifyEndGame(capturedPiece)
    if(endGame.isEndGame){
        statusGame.addEndGame(endGame.winColor)
    }
    const nextColor=(colorPieceBoard.top===colorMove)?colorPieceBoard.bottom:colorPieceBoard.top
    updateStatusCheck.apply(this,[nextColor])
    this.verifyDrawGame(nextColor)
    this.colorPieceBoard.play=nextColor
}

export default {
    verifyStatusGame,
    verifyEndGame,
    updateStatusCheck,
    verifyCheck,
    verifyCheckMate,
}