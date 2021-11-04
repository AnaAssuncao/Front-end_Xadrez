import {checkRegularMovement} from "./utils.js"

function movementsPossibilitiesKing(chessBoard=this.chessBoard,color=this.color, position=this.position){
    const column=Number(position.charAt(3))
    const line=Number(position.charAt(4))
    const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]]

    let movement = direction.reduce((movementsPossibilities,direction)=>{
        const newPossibilitiesMovement = movementsPossibilities.concat(checkRegularMovement(direction, column, line, color,1,chessBoard))
        return newPossibilitiesMovement
    },[])

    return movement
}

export default movementsPossibilitiesKing