import verifyEndGame from "./VerifyEndGame.js"
import updateStatusCheck from "./UpdateStatusCheck.js"
import verifyCheck from "./VerifyCheck.js"
import verifyCheckMate from "./VerifyCheckMate.js"
import verifyDrawGame from "./VerifyDrawGame.js"

function verifyStatusGame(colorMove,statusGame=this.statusGame,capturedPiece=this.capturedPiece,colorPieceBoard=this.colorPieceBoard){
    const endGame = verifyEndGame(capturedPiece)
    if(endGame.isEndGame){
        statusGame.addEndGame(endGame.winColor)
    }
    statusGame.changeColorPlay()
    updateStatusCheck.apply(this,[this.statusGame.colorPieces.play])
    verifyDrawGame.apply(this)
}

export default {
    verifyStatusGame,
    verifyEndGame,
    updateStatusCheck,
    verifyCheck,
    verifyCheckMate,
    verifyDrawGame
}