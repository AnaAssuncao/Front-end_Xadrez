import {refIdToArray} from "../utils.js"

function pathToCheck(nameKing,checks, piecesBoard= this.piecesBoard){
    const refIdPossiblePaths=[]
    const positionPieceAdversary = piecesBoard.pieces[checks.pieceCheck].position
    const positionInitialKing = piecesBoard.pieces[nameKing].position
    let direction = [0,0]

    // descobrir direção
    for(let refMovementKing of piecesBoard.pieces[nameKing].refMovements){
       for(let refMovementAdversary of piecesBoard.pieces[checks.pieceCheck].refMovements){
           if(refMovementKing===refMovementAdversary){
                refIdPossiblePaths.push(refMovementAdversary)
                const arrayPositionKing=refIdToArray(positionInitialKing)
                const arrayPositionAdversary=refIdToArray(refMovementAdversary)
                direction = [(arrayPositionAdversary[0]-arrayPositionKing[0]),(arrayPositionAdversary[1]-arrayPositionKing[1])]
                break
            }
       }
    }

    let currentRefid = refIdPossiblePaths[0]
    while(currentRefid){
        const refId = refIdToArray(currentRefid)
        const possibleRefid = `ref${refId[0]+direction[0]}${refId[1]+direction[1]}`
        for(let refMovementAdversary of piecesBoard.pieces[checks.pieceCheck].refMovements){
            if(possibleRefid===refMovementAdversary){
                refIdPossiblePaths.push(possibleRefid)
                currentRefid = possibleRefid
                break
            }
        }
        if(possibleRefid!==currentRefid){
            currentRefid = null
        }         
    }
    refIdPossiblePaths.push(positionPieceAdversary)
    return refIdPossiblePaths
}

export default pathToCheck