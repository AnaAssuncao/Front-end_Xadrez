export default class PlayHistory{
    constructor(){
        this.history=[]
    }
    setHistory(history){
        this.history.push(history)
    }
    deleteLastHistory(){
        this.history.pop()  
    }
}