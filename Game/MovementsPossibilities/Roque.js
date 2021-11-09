function roque(color,piecesBoard=this.piecesBoard,statusGame=this.statusGame,specialMovement=this.specialMovement){
    const nameKing = `King${color}`
    if(piecesBoard.pieces[nameKing].qtMovements===0 &&statusGame.checkKing.check===false){
        const nameTowerLeft = `Tower-Left${color}`
        const towerLeft = piecesBoard.pieces[nameTowerLeft]
        const nameTowerRight = `Tower-Right${color}`
        const towerRight = piecesBoard.pieces[nameTowerRight]

        if(towerLeft.qtMovements===0){
            if(towerLeft.refMovements.includes("ref41")){    
               possibleMovementRoque(towerLeft,"ref41",nameKing,piecesBoard,specialMovement)
            } 
            if(towerLeft.refMovements.includes("ref48")){
                possibleMovementRoque(towerLeft,"ref48",nameKing,piecesBoard,specialMovement)
            }         
        }
        if(towerRight.qtMovements===0){
            if(towerRight.refMovements.includes("ref61")){
                possibleMovementRoque(towerRight,"ref61",nameKing,piecesBoard,specialMovement)
            } 
            if(towerRight.refMovements.includes("ref68")){ 
                possibleMovementRoque(towerRight,"ref68",nameKing,piecesBoard,specialMovement)
            }
        }
    }
}

function  possibleMovementRoque(towerPiece,refMovementTower,nameKing,piecesBoard=this.piecesBoard,specialMovement=this.specialMovement){
    const towerMovement = {
        ref41:"ref31",
        ref48:"ref38",
        ref61:"ref71",
        ref68:"ref78"
    }   
    const possibleMovement = towerMovement[refMovementTower] 
    const kingPiece = piecesBoard.pieces[nameKing]
    specialMovement.addRoqueMovement(true,kingPiece,possibleMovement,towerPiece,refMovementTower)
    kingPiece.changeMovementsPossibilities([...kingPiece.refMovements,possibleMovement])
    const specialRoque = {
        positions:possibleMovement,
        type:"roque"
    }
    kingPiece.addPossibleSpecialMovements(specialRoque)
}

export default roque