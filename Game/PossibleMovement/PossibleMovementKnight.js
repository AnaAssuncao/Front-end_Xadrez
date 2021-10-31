import {checkRegularMovement} from "./utils.js"

function possibleMovementKnight(chessBoard=this.chessBoard){
    const column=Number(this.position.charAt(3))
    const line=Number(this.position.charAt(4))
    const direction = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[-1,2],[-1,-2],[1,-2]]

    const movement= direction.reduce((possibleMovement,direction)=>{
        const newPossibilitiesMovement =  possibleMovement.concat(checkRegularMovement(direction, column, line, this.color,1,chessBoard))
        return newPossibilitiesMovement
    },[])

    return movement
}
export default possibleMovementKnight