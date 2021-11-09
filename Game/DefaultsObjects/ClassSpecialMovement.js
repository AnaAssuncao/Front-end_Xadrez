export default class SpecialMovement{

    constructor(){
        this.roque={
            isPossible:false,
            king:null,
            positionKingToRoque:[],
            tower:[],
            newMovementTower:[]
        }
        this.enPassant={
            isPossible:false,
            pawnPossibleCapture:null,
            refIdAtack:null,
            pawnInAtack:[]
        }
        this.pawnPromotion={
            isPossible:false,
            piecesPawn:[],   
            namesPawn:[]  
        }  
    }
    addRoqueMovement(isPossible,king,possibleMovement,tower,refMovementTower){
        this.roque.isPossible=isPossible
        this.roque.king= king
        this.roque.positionKingToRoque.push(possibleMovement)
        this.roque.tower.push(tower)
        this.roque.newMovementTower.push(refMovementTower)
        console.log(this.roque)
    }
    addEnPassantMovement(isPossible,pawnPossibleCapture,newMovementPiece,pawnInAtack){
        this.enPassant.isPossible=isPossible
        this.enPassant.pawnPossibleCapture=pawnPossibleCapture
        this.enPassant.refIdAtack=newMovementPiece
        this.enPassant.pawnInAtack=pawnInAtack    
    }
    addPawnPromotion(pawn,namePawn){
        this.pawnPromotion.isPossible=true
        this.pawnPromotion.piecesPawn.push( pawn)
        this.pawnPromotion.namesPawn.push(namePawn)
    }
}