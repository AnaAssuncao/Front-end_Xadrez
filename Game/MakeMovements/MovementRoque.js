import saveHistory from "../History/index.js"
import makeMovements from "./index.js"

function movementRoque(informationPieceToMove,specialMovement=this.specialMovement,playHistory=this.playHistory){
    const indice = specialMovement.roque.positionKingToRoque.indexOf(informationPieceToMove.refId)
    const informationTowerMove={
        color: specialMovement.roque.tower[indice].color,
        fullName: specialMovement.roque.tower[indice].fullName,
        refId:specialMovement.roque.newMovementTower[indice]
    }
    const roque = "roque"
    saveHistory.setPlay.apply(this,[[informationPieceToMove,informationTowerMove],roque])
    makeMovements.changePiecePosition.apply(this,[specialMovement.roque.king,informationPieceToMove])
    makeMovements.changePiecePosition.apply(this,[specialMovement.roque.tower[indice],informationTowerMove])
}

export default movementRoque