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

const refPawnCaptured = "ref25"
const pawnBlack = defaultsObjects.factoryMakePiece.apply({chessBoard,statusGame},["Pawn","Pawn-2black","black","Pawnblack",refPawnCaptured,movementsPossibilities.pawn])
piecesBoard.addPieceOfRef("Pawn-1black",pawnBlack)
chessBoard.addPieceOfRef(refPawnCaptured,pawnBlack)

const refPawnWhite = "ref15"
const pawnWhite = defaultsObjects.factoryMakePiece.apply({chessBoard,statusGame},["Pawn","Pawn-1white","white","PawnWhite",refPawnWhite,movementsPossibilities.pawn])
piecesBoard.addPieceOfRef("Pawn-1white",pawnWhite)
chessBoard.addPieceOfRef(refPawnWhite,pawnWhite)
const refPawnInAtack="ref26"
specialMovement.addEnPassantMovement(true,pawnBlack,refPawnInAtack,pawnWhite)
pawnWhite.changeMovementsPossibilities([...pawnWhite.refMovements,refPawnInAtack])
const specialEnPassant = {
    positions: specialMovement.enPassant.refIdAtack,
    type:"enPassant"
}
pawnWhite.addPossibleSpecialMovements(specialEnPassant)

describe("Movement En Passant",()=>{
    test("Should change piece position",()=>{
        const informationPieceToMove={
            color: "white",
           fullName: "Pawn-1white",
           piecePromotion: null,
           refId: refPawnInAtack,
           specialMovement: true,
           typeMovement: "enPassant"
       }
        makeMovements.movementEnPassant.apply({chessBoard,specialMovement,playHistory,piecesBoard,capturedPiece},[informationPieceToMove])
        expect(chessBoard.reference[refPawnInAtack]).toEqual(pawnWhite)
        expect(chessBoard.reference[refPawnCaptured]).toBeNull()
    })
})

