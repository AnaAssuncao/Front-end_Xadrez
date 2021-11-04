function updateStatusCheck(color,piecesBoard=this.piecesBoard,statusGame=this.statusGame,colorPieceBoard=this.colorPieceBoard){
    statusGame.checkKing.check=false
    const nameKing =`King${color}` 
    const checks=this.verifyCheck( piecesBoard.pieces[nameKing].position,color,nameKing)

    if(checks.qt!==0){
        statusGame.checkKing.refIdPathsToCheck = this.pathToCheck(nameKing,checks)
        statusGame.checkKing.check=true
        statusGame.checkKing.checkMate=this.checkMate(nameKing,color,checks)
            if( statusGame.checkKing.checkMate===true){
                statusGame.endGame=true
                statusGame.winColor=(colorPieceBoard.top===color)?colorPieceBoard.bottom:colorPieceBoard.top
            }
    }
} 
 
export default updateStatusCheck