import createObjHistory from "./CreateObjHistory.js"

function setPlay(informationPieceSelect,typeMovement="movementPiece",playHistory=this.playHistory){
    const objHistory = createObjHistory.apply(this,[informationPieceSelect,typeMovement])
    playHistory.setHistory(objHistory)
}

export default {
    setPlay,
    createObjHistory
}