function returnChangePiece(chessBoard=this.chessBoard,piecesBoard=this.piecesBoard,playHistory=this.playHistory,capturedPiece=this.capturedPiece){
    const lastMovement= playHistory.history.length-1
    if(lastMovement>=0){
        playHistory.history[lastMovement].piecesPlayed.forEach((piecesPlayed,ind)=>{
            if(playHistory.history[lastMovement].typeMovement==="piecePromotion" && ind===1){
                const namePiece=piecesPlayed.fullName
                piecesBoard.deletePiece(namePiece)
            }
            else{
                const position = playHistory.history[lastMovement].newRefId[ind]
                chessBoard.deletePieceOfRef(position)
                if(playHistory.history[lastMovement].pieceCaptured!==null){
                    const namePieceCaptured =playHistory.history[lastMovement].pieceCaptured.fullName
                    const pastPiece = playHistory.history[lastMovement].pieceCaptured
                    pastPiece.enablePiece()
                    const positionPieceCaptured=playHistory.history[lastMovement].pieceCaptured.position
                    piecesBoard.addPieceOfRef(namePieceCaptured,pastPiece)
                    chessBoard.addPieceOfRef(positionPieceCaptured,pastPiece)
                    capturedPiece.deleteCapturedPiece(namePieceCaptured)
                }
                const positionBack = piecesPlayed.position
                const fullNameBack = piecesPlayed.fullName
                piecesPlayed.changePosition(positionBack)
                piecesBoard.addPieceOfRef(fullNameBack,piecesPlayed)
                chessBoard.addPieceOfRef(positionBack,piecesPlayed)
            }
        })
        playHistory.deleteLastHistory ()
    } 
}

export default returnChangePiece