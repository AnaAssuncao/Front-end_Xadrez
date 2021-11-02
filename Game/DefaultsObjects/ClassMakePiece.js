
export default class MakePiece {
    constructor(name,fullName,color,img,position,functionPiece,protoFather,isAtive=true){
        this.__proto__=protoFather,
        this.name=name,
        this.fullName=fullName,
        this.color=color,
        this.imgName=img,
        this.position=position,
        this.isAtive=isAtive,
        this.functionPiece=functionPiece,
        this.qtMovements=0,
        this.refMovements=[],
        this.possibleSpecialMovements=[]
    }
    disablePiece(){
        this.isAtive=false
    }
    changePossibleMovements(){
        this.refMovements= this.functionPiece()
    }
    addPossibleSpecialMovements(newMovements){
        this.possibleSpecialMovements.push(newMovements)
    }
    deletePossibleSpecialMovements(namePiece){
        this.possibleSpecialMovements=[]
    }
}

