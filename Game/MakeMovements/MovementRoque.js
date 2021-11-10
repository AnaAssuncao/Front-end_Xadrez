import createObjHistory from "../PlayHistory/CreateObjHistory.js"
import makeMovements from "./index.js"

function movementRoque(informationPieceToMove,specialMovement=this.specialMovement,playHistory=this.playHistory){
    const indice = specialMovement.roque.positionKingToRoque.indexOf(informationPieceToMove.refId)
    const informationTowerMove={
        color: specialMovement.roque.tower[indice].color,
        fullName: specialMovement.roque.tower[indice].fullName,
        refId:specialMovement.roque.newMovementTower[indice]
    }
    const roque = "roque"
    const objHistory = createObjHistory.apply(this,[[informationPieceToMove,informationTowerMove],roque])
    playHistory.setHistory(objHistory)
    makeMovements.changePiecePosition.apply(this,[specialMovement.roque.king,informationPieceToMove])
    makeMovements.changePiecePosition.apply(this,[specialMovement.roque.tower[indice],informationTowerMove])
}

export default movementRoque