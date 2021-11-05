import verifyCheck from "./VerifyCheck.js"
import pathToCheck from "./PathToCheck.js"
import verifyCheckMate from "./VerifyCheckMate.js"

function updateStatusCheck(color,piecesBoard=this.piecesBoard,statusGame=this.statusGame,colorPieceBoard=this.colorPieceBoard){
    statusGame.checkKing.check=false
    const nameKing =`King${color}` 
    const checks = verifyCheck.apply(this,[piecesBoard.pieces[nameKing].position,color])

    if(checks.qt!==0){
        statusGame.checkKing.refIdPathsToCheck = pathToCheck(nameKing,checks,piecesBoard)
        statusGame.checkKing.check=true
        statusGame.checkKing.checkMate=verifyCheckMate.apply(this,[nameKing,color,checks])
            if( statusGame.checkKing.checkMate===true){
                statusGame.endGame=true
                statusGame.winColor=(colorPieceBoard.top===color)?colorPieceBoard.bottom:colorPieceBoard.top
            }
    }
} 
export default updateStatusCheck