function verifyEndGame(capturedPiece=this.capturedPiece){
    let winColor = null
    let isEndGame = false
    const kingWhite = capturedPiece.pieces["Kingwhite"]
    const kingBlack = capturedPiece.pieces["Kingblack"]
    if(kingWhite){
        isEndGame = true
        winColor ="black"
    }
    if(kingBlack){
        isEndGame = true
        winColor ="white"
    }
    return {
        isEndGame,
        winColor
    }
}

export default verifyEndGame