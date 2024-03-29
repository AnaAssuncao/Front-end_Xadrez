export default class StatusGame{
    constructor({top,bottom}){
        this.colorPieces={
            top:top,
            bottom:bottom,
            play:"white"
        }
        this.checkKing={
            color:null,
            check:false,
            checkMate:false,
            refIdPathsToCheck: []
        },
        this.drawn=false,
        this.endGame=false,
        this.winColor=null
    }
    addEndGame(color){
        this.endGame=true
        this.winColor=color
    }
    clearStatus(){
        this.checkKing.check=false
        this.drawn=false
        this.endGame=false
        this.checkKing.checkMate=false
        this.winColor=null
    }
    updateCheck(isCheck){
        this.checkKing.check=isCheck
    }
    updateCheckMate(isCheckmate){
        this.checkKing.checkMate=isCheckmate
    }
    updateDrawGame(isDrawn){
        this.drawn=isDrawn
    }
    updateEndGame(isEndGame){
        this.endGame=isEndGame
    }
    updateWinColor(color){
        this.winColor=color
    }
    changeColorPlay(){
        const nextColor = (this.colorPieces.top===this.colorPieces.play)?this.colorPieces.bottom:this.colorPieces.top
        this.colorPieces.play = nextColor
    }

}