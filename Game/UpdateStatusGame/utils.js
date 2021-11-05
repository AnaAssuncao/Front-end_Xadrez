export function movementsPieceAdversity(movementsPiece,refIdKing){
    for (let i = 0;i<movementsPiece.length;i++){
        if(movementsPiece[i]===refIdKing){
            return true
        }                    
    } 
    return false
}

export function test(movementsPiece,refIdKing){
    for (let i = 0;i<movementsPiece.length;i++){
        if(movementsPiece[i]===refIdKing){
            return true
        }                    
    } 
    return false
}
