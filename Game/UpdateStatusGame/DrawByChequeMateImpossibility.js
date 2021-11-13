function  drawByChequeMateImpossibility(piecesBoard=this.piecesBoard){
    const pieceAtive=[]
    for(let namePiece in piecesBoard.pieces){
        if( piecesBoard.pieces[namePiece].isAtive){
            pieceAtive.push(namePiece)
        }
    }
    if(pieceAtive.length>4){
        return false
    }
    if(pieceAtive.length===2){
        return true
    }
    if(pieceAtive.length===3){
        for(let piece of pieceAtive){
            if(piece.includes("Bishop")||piece.includes("Knigth")){
                return true
            }
        }
    }
    if(pieceAtive.length===4){
        if((pieceAtive.includes("Bishop-Leftblack")||pieceAtive.includes("Bishop-Rightblack"))
        &&(pieceAtive.includes("Bishop-Leftwhite")||pieceAtive.includes("Bishop-Rightwhite"))){
            return true
        }
    }
}

export default drawByChequeMateImpossibility