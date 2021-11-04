function verifyEndGame(capturedPiece=this.capturedPiece){
    let winColor = null
    let endGame = false
    const kingWhite = capturedPiece.pieces["Kingwhite"]
    const kingBlack = capturedPiece.pieces["Kingblack"]
    if(kingWhite){
        endGame = true
        winColor ="black"
    }
    if(kingBlack){
        endGame = true
        winColor ="white"
    }
    return {
        endGame,
        winColor
    }
}

export default verifyEndGame