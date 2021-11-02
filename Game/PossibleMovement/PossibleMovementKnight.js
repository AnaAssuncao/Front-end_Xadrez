import {checkRegularMovement} from "./utils.js"

function possibleMovementKnight(chessBoard=this.chessBoard.reference,color=this.color, position=this.position){
    const column=Number(position.charAt(3))
    const line=Number(position.charAt(4))
    const direction = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[-1,2],[-1,-2],[1,-2]]

    const movement= direction.reduce((possibleMovement,direction)=>{
        const newPossibilitiesMovement =  possibleMovement.concat(checkRegularMovement(direction, column, line,color,1,chessBoard))
        return newPossibilitiesMovement
    },[])

    return movement
}
export default possibleMovementKnight