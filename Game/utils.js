function refIdToArray(refId){
    return [Number(refId.charAt(3)),Number(refId.charAt(4))]
}

function movementsPieceAdversity(movementsPiece,refIdKing){
    for (let i = 0;i<movementsPiece.length;i++){
        if(movementsPiece[i]===refIdKing){
            return true
        }                    
    } 
    return false
}

export {refIdToArray,movementsPieceAdversity}