const defaultBlackPieces=["towerBlack","knightBlack","bishopBlack","queenBlack","kingBlack","bishopBlack","knightBlack","towerBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack"]
const defaulWhitePieces=["towerWhite","knightWhite","bishopWhite","queenWhite","kingWhite","bishopWhite","knightWhite","towerWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite"]
const defaultNamePieces =["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"]
const defaultChessBoard ={
    reference: {  
        ref11:null,
        ref12:null,
        ref13:null,
        ref14:null,
        ref15:null,
        ref16:null,
        ref17:null,
        ref18:null,
        ref21:null,
        ref22:null,
        ref23:null,
        ref24:null,
        ref25:null,
        ref26:null,
        ref27:null,
        ref28:null,
        ref31:null,
        ref32:null,
        ref33:null,
        ref34:null,
        ref35:null,
        ref36:null,
        ref37:null,
        ref38:null,
        ref41:null,
        ref42:null,
        ref43:null,
        ref44:null,
        ref45:null,
        ref46:null,
        ref47:null,
        ref48:null,
        ref51:null,
        ref52:null,
        ref53:null,
        ref54:null,
        ref55:null,
        ref56:null,
        ref57:null,
        ref58:null,
        ref61:null,
        ref62:null,
        ref63:null,
        ref64:null,
        ref65:null,
        ref66:null,
        ref67:null,
        ref68:null,
        ref71:null,
        ref72:null,
        ref73:null,
        ref74:null,
        ref75:null,
        ref76:null,
        ref77:null,
        ref78:null,
        ref81:null,
        ref82:null,
        ref83:null,
        ref84:null,
        ref85:null,
        ref86:null,
        ref87:null,
        ref88:null},
    getPiece(refId){
        return this.reference[refId]
    },
    addPieceOfRef(newRefIf,piece){
        this.reference[newRefIf]=piece
    },
    deletePieceOfRef(oldRefId){
        this.reference[oldRefId]=null
    }
}

const defaultPiecesBoard={
    pieces:{

    },
    addPieceOfRef(namePiece,piece){
        this.pieces[namePiece]=piece
    },
    changePossibleMovements(namePiece){
        this.pieces[namePiece].refMovements= this.pieces[namePiece].functionPiece()
    },
    addPossibleSpecialMovements(namePiece,newMovements){
        this.pieces[namePiece].possibleSpecialMovements.push(newMovements)
    },
    deletePossibleSpecialMovements(namePiece){
        this.pieces[namePiece].possibleSpecialMovements=[]
    },
}

const defaultStatusGame={
    checkKing:{
        color:null,
        check:false,
        checkMate:false,
        refIdPathsToCheck: []
    },
    statusDrawn:{
        draw:false
    },
    endGame:false,
    winColor:null,
}

const defaultSpecialMovement={
    roque:{
        isPossible:false,
        king:null,
        positionKingToRoque:[],
        tower:[],
        newMovementTower:[],
    },
    enPassant:{
        isPossible:false,
        pawnPossibleCapture:null,
        refIdPawn:null,
        pawnInAtack:[]
    },
    pawnPromotion:{
        isPossible:false,
        piecesPawn:[],   
        namesPawn:[],  
    }        
}  

const defaultPiecesPromotion={
    chancePiece:false,
    promotedPawn:null,
    color:null,
    black:{
        qtPiece:[1,1,1,1]},
    white:{
        qtPiece:[1,1,1,1]},
    newPiece:null,
}

const defaultCapturePiece ={}

const defaultPlayHistory= []

export {
    defaultPiecesBoard,
    defaultBlackPieces,
    defaulWhitePieces,
    defaultNamePieces,
    defaultChessBoard,
    defaultStatusGame,
    defaultSpecialMovement,
    defaultPiecesPromotion,
    defaultCapturePiece,
    defaultPlayHistory
}