import defaultObjets from "../DefaultsObjects/index.js"
import movementsPossibilities from "../MovementsPossibilities/index.js"

function piecePromotion(informationNewPiece,pawnPiece,piecesPromotion=this.piecesPromotion){
    const chancePiece={
        names:["Tower","Knight","Bishop","Queen"],
        functionPieces:[movementsPossibilities.tower,movementsPossibilities.knight,movementsPossibilities.bishop,movementsPossibilities.queen],
        fullName:{
            black:["towerBlack","knightBlack","bishopBlack","queenBlack"],
            white:["towerWhite","knightWhite","bishopWhite","queenWhite"]
        }
    }
    const color = pawnPiece.color
    const indChangePiece= chancePiece.fullName[color].indexOf(informationNewPiece.piecePromotion)
    const namePiece=`${chancePiece.names[indChangePiece]}-${piecesPromotion.qtPiece[color][indChangePiece]}`
    const fullName=namePiece+color
    const img = informationNewPiece.piecePromotion
    const position = informationNewPiece.refId
    const functionPiece = chancePiece.functionPieces[indChangePiece]
    const newPiece = defaultObjets.factoryMakePiece.apply(this,[namePiece,fullName,color,img,position,functionPiece])
    piecesPromotion.addPiecesPromotion(color,newPiece,pawnPiece.qtMovements,indChangePiece)
}

export default piecePromotion