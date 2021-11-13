function  drawByFiftyRules(playHistory=this.playHistory,numberPlays= 100){
    const qtPlays =playHistory.history.length
    if(qtPlays>=numberPlays){
        for(let i = 1;(i<=numberPlays);i++){
            if(playHistory.history[qtPlays-i].piecesPlayed[0].name.includes("Pawn") || playHistory.history[qtPlays-i].pieceCaptured){
                return false
            }
        }
        return true
    }
    return false
}

export default drawByFiftyRules