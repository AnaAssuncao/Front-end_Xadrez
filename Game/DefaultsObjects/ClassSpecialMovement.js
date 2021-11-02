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
            refIdPawn:null,
            pawnInAtack:[]
        }
        this.pawnPromotion={
            isPossible:false,
            piecesPawn:[],   
            namesPawn:[]  
        }  
    }
}