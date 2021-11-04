import {checkRegularMovement} from "./utils.js"

function movementsPossibilitiesTower (chessBoard=this.chessBoard,color=this.color, position=this.position)
{
    const column=Number(position.charAt(3))
    const line=Number(position.charAt(4))
    const direction = [[0,1],[0,-1],[1,0],[-1,0]]
    
    const movement= direction.reduce((movementsPossibilities,direction)=>{
        const newPossibilitiesMovement =  movementsPossibilities.concat(checkRegularMovement(direction, column, line, color,8,chessBoard))
        return newPossibilitiesMovement
    },[])
    
    return movement
}
export default movementsPossibilitiesTower