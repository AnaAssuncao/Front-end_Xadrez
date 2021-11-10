// movementPawnPromotion(informationPieceToMove,piecesBoard=this.piecesBoard,playHistory=this.playHistory,piecesPromotion=this.piecesPromotion){
import makeMovements from "../../Game/makeMovements/index.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const color={
    top:"black",
    bottom:"white"
}
const chessBoard = new defaultsObjects.ClassChessBoard()
const specialMovement = new defaultsObjects.ClassSpecialMovement ()
const statusGame = new defaultsObjects.ClassStatusGame (color)
const playHistory = new defaultsObjects.ClassPlayHistory ()
const capturedPiece = new defaultsObjects.ClassCapturedPiece ()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const piecesPromotion = new defaultsObjects.ClassPiecesPromotion()

const refPawn = "ref12"
const namePawn = "Pawn-2black"
const pawnBlack = defaultsObjects.factoryMakePiece.apply({chessBoard,statusGame},["Pawn",namePawn,"black","Pawnblack",refPawn,movementsPossibilities.pawn])
piecesBoard.addPieceOfRef(namePawn,pawnBlack)
chessBoard.addPieceOfRef(refPawn,pawnBlack)

specialMovement.addPawnPromotion(pawnBlack,namePawn)
const newRefId = 'ref11'
const specialPawnPromotion = {
    positions: [newRefId],
    type:"piecePromotion"
}
pawnBlack.addPossibleSpecialMovements(specialPawnPromotion)

describe("Movement Pawn Promotion",()=>{
    test("Should change piece position",()=>{
        const informationPieceToMove={
            color: "black",
            fullName: namePawn,
            piecePromotion: "towerBlack",
            refId: newRefId,
            specialMovement: true,
            typeMovement: "piecePromotion"
        }
        makeMovements.movementPawnPromotion.apply({chessBoard,specialMovement,playHistory,piecesBoard,capturedPiece,piecesPromotion},[informationPieceToMove])
        expect(chessBoard.reference[newRefId]).not.toEqual(pawnBlack)
        expect(chessBoard.reference[newRefId].fullName).toBe("Tower-1black")
    })
})
