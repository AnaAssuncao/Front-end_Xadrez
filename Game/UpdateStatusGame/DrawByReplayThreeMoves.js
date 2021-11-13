function drawByReplayThreeMoves(statusGame=this.statusGame,playHistory=this.playHistory){
    const qtPlays= playHistory.history.length-1
    if(qtPlays>=6 && statusGame.checkKing.check===true){
        const lastPlay=playHistory.history[qtPlays]
        const penultimatePlay=playHistory.history[qtPlays-1]
        if(lastPlay.piecesPlayed[0].fullName.includes("King")||penultimatePlay.piecesPlayed[0].fullName.includes("King")){
            const conditions={
                play1:lastPlay.piecesPlayed[0]===playHistory.history[qtPlays-2].piecesPlayed[0],
                play2:penultimatePlay.piecesPlayed[0]===playHistory.history[qtPlays-3].piecesPlayed[0],
                play3:lastPlay.piecesPlayed[0]===playHistory.history[qtPlays-4].piecesPlayed[0] && lastPlay.newRefId[0]===playHistory.history[qtPlays-4].newRefId[0],
                play4:penultimatePlay.piecesPlayed[0]===playHistory.history[qtPlays-5].piecesPlayed[0] && penultimatePlay.newRefId[0]===playHistory.history[qtPlays-5].newRefId[0]
            }
                if(conditions.play1===true && conditions.play2===true && conditions.play3===true && conditions.play4===true){
                    return true
                }
            }
        }

    return false
}

export default drawByReplayThreeMoves