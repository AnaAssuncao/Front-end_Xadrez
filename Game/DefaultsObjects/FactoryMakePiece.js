function enablePiece(){
    this.isAtive=true
}
function disablePiece(){
    this.isAtive=false
}
function changeMovementsPossibilities(newRefMovements){
    this.refMovements= newRefMovements
}
function updateMovementsPossibilities(){
    this.refMovements= this.functionPiece()
}
function addPossibleSpecialMovements(newMovements){
    this.possibleSpecialMovements.push(newMovements)
}
function deletePossibleSpecialMovements(){
    this.possibleSpecialMovements=[]
}
function changePosition(newPosition){
    this.position= newPosition
}
function increaseQtMovements(){
    this.qtMovements++
}
function decreaseQtMovements(){
    this.qtMovements--
}

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
        enablePiece,
        disablePiece,
        changeMovementsPossibilities,
        updateMovementsPossibilities,
        addPossibleSpecialMovements,
        deletePossibleSpecialMovements,
        changePosition,
        increaseQtMovements,
        decreaseQtMovements
    }
}

