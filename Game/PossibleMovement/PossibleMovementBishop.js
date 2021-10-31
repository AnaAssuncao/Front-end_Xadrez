import {checkRegularMovement} from "./utils.js"

function possibleMovementBishop(chessBoard=this.chessBoard){
    console.log(chessBoard)
    const column=Number(this.position.charAt(3))
    const line=Number(this.position.charAt(4))
    const direction=[[1,1],[1,-1],[-1,-1],[-1,1]]

    const movement= direction.reduce((possibleMovement,direction)=>{
        const newPossibilitiesMovement =  possibleMovement.concat(checkRegularMovement(direction, column, line, this.color,8,chessBoard))
        return newPossibilitiesMovement
    },[])
    console.log(movement)
    return movement
}

export default possibleMovementBishop