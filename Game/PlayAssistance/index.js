import assistantKing from "./AssistantKing.js"
import checkAssistance from "./CheckAssistance.js"
import assistantPiece from "./AssistantPiece.js"

function updateFilterMovement(color, statusGame=this.statusGame){
    if(statusGame.checkKing.checkMate===false){
        if(statusGame.checkKing.check===true ){
            checkAssistance.apply(this,[color])
        }
        else{
            assistantKing.apply(this,[color])
            assistantPiece.apply(this,[color])
        }
    }
}

export default {
    assistantKing,
    checkAssistance,
    assistantPiece,
    updateFilterMovement
}