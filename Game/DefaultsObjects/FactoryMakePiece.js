
export default function makePiece (name,fullName,color,img,position,functionPiece,isAtive=true){
    return{
        __proto__:this,
        name:name,
        fullName:fullName,
        color:color,
        imgName:img,
        position:position,
        isAtive:isAtive,
        functionPiece:functionPiece,
        qtMovements:0,
        refMovements:[],
        possibleSpecialMovements:[],
        disablePiece:function(){
            this.isAtive=false
        },
        changePossibleMovements:function(){
            this.refMovements= this.functionPiece()
        },
        addPossibleSpecialMovements:function(newMovements){
            this.possibleSpecialMovements.push(newMovements)}
        ,
        deletePossibleSpecialMovements:function(){
            this.possibleSpecialMovements=[]
        },
        changePosition:function(newPosition){
            this.position= newPosition
        },
    }
}

