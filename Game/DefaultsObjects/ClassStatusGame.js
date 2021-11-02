export default class StatusGame{
    constructor(){
        this.checkKing={
            color:null,
            check:false,
            checkMate:false,
            refIdPathsToCheck: []
        },
        this.statusDrawn={
            draw:false
        },
        this.endGame=false,
        this.winColor=null
    }
}