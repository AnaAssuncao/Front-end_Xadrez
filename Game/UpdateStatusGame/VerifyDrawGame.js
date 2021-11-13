import drawByDrowning from "./DrawByDrowning.js"
import drawByReplayThreeMoves from "./DrawByReplayThreeMoves.js"
import drawByFiftyRules from "./DrawByFiftyRules.js"
import drawByChequeMateImpossibility from "./DrawByChequeMateImpossibility.js"

function verifyDrawGame(piecesBoard=this.piecesBoard,statusGame=this.statusGame,playHistory=this.playHistory){
    const draw=[]
    draw.push(drawByDrowning(piecesBoard,statusGame))
    draw.push(drawByReplayThreeMoves(statusGame,playHistory))
    draw.push(drawByFiftyRules(playHistory))
    draw.push(drawByChequeMateImpossibility(piecesBoard))
    if(draw.includes(true)){
        statusGame.updateDrawGame(true)
        statusGame.updateEndGame(true)
    }
}

export default verifyDrawGame