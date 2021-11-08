export default class StatusGame{
    constructor({top,bottom}){
        this.colorPieces={
            top:top,
            bottom:bottom,
            play:null
        }
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

    addEndGame(color){
        this.endGame=true
        this.winColor=color
    }

    clearStatus(){
        this.endGame=false
        this.checkKing.checkMate=false
        this.winColor=null
    }

    changeColorPlay(){
        const nextColor = (this.colorPieces.top===this.colorPieces.play)?this.colorPieces.bottom:this.colorPieces.top
        this.colorPieces.play = nextColor
    }

}