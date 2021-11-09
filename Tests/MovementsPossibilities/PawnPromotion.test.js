import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"

const colors={
    top:"black",
    bottom:"white"
}
const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const statusGame = new defaultsObjects.ClassStatusGame(colors)
const specialMovement = new defaultsObjects.ClassSpecialMovement()

const refPawnWhite = "ref27"
const color = "white"
const pawnWhite = defaultsObjects.factoryMakePiece.apply({chessBoard,statusGame},["Pawn","Pawn-1white",color,"PawnWhite",refPawnWhite,movementsPossibilities.pawn])
piecesBoard.addPieceOfRef("Pawn-1white",pawnWhite)
chessBoard.addPieceOfRef(refPawnWhite,pawnWhite)

describe("Possible Movement Pawn Promotion", ()=>{
    test("Should happen Pawn Promotion special movement",()=>{
        movementsPossibilities.updateAllMovements(piecesBoard)
        movementsPossibilities.pawnPromotion(piecesBoard,specialMovement,statusGame)
        const pawnPromotionMovement={
            isPossible:true,
            piecesPawn:[pawnWhite],   
            namesPawn:['Pawn-1white'] 
        }
        expect(specialMovement.pawnPromotion).toEqual(pawnPromotionMovement)
    })
})