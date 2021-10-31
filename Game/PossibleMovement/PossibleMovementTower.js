import {checkRegularMovement} from "./utils.js"

function possibleMovementTower (chessBoard=this.chessBoard)
{
    const column=Number(this.position.charAt(3))
    const line=Number(this.position.charAt(4))
    const direction = [[0,1],[0,-1],[1,0],[-1,0]]
    
    const movement= direction.reduce((possibleMovement,direction)=>{
        const newPossibilitiesMovement =  possibleMovement.concat(checkRegularMovement(direction, column, line, this.color,8,chessBoard))
        return newPossibilitiesMovement
    },[])
    
    return movement
}
export default possibleMovementTower