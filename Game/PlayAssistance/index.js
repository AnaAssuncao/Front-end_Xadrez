

function updateFilterMovement(color, statusGame=this.statusGame){
    if(statusGame.checkKing.checkMate===false){
        if(statusGame.checkKing.check===true ){
            this.checkAssistance(color)
        }
        else{
            this.assistantKing(color)
            this.assistantPiece(color)
        }
    }
}

export default {
    updateFilterMovement
}