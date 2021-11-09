import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"

const colors={
    top:"black",
    bottom:"white"
}
const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const statusGame = new defaultsObjects.ClassStatusGame(colors)
const playHistory = new defaultsObjects.ClassPlayHistory()
const specialMovement = new defaultsObjects.ClassSpecialMovement()

const pawnBlack = defaultsObjects.factoryMakePiece.apply({chessBoard,statusGame},["Pawn","Pawn-2black","black","Pawnblack","ref27",movementsPossibilities.pawn])

const refPawnWhite = "ref15"
const color = "white"
const pawnWhite = defaultsObjects.factoryMakePiece.apply({chessBoard,statusGame},["Pawn","Pawn-1white",color,"PawnWhite",refPawnWhite,movementsPossibilities.pawn])
piecesBoard.addPieceOfRef("Pawn-1white",pawnWhite)
chessBoard.addPieceOfRef(refPawnWhite,pawnWhite)

const refPawnBlack = "ref25"
const lastHistory = {
    newRefId: [refPawnBlack],
    pieceCaptured: null,
    piecesPlayed: [{...pawnBlack}],
    typeMovement: "movementPiece"
}
playHistory.setHistory(lastHistory)
pawnBlack.changePosition(refPawnBlack)
piecesBoard.addPieceOfRef("Pawn-2black",pawnBlack)
chessBoard.addPieceOfRef(refPawnBlack,pawnBlack)

describe("Possible Movement En Passant", ()=>{
    test("Should happen En Passant special movement",()=>{
        movementsPossibilities.enPassant(color,chessBoard,piecesBoard,playHistory,specialMovement,statusGame)
        const enPassantMovement={
            isPossible:true,
            pawnPossibleCapture:pawnBlack,
            refIdAtack:"ref26",
            pawnInAtack: pawnWhite
        }
        expect(specialMovement.enPassant).toEqual(enPassantMovement)
    })
})