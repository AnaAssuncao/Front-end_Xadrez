import returnChangePiece from "../../Game/ReturnMovement/ReturnChangePiece.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const playHistory = new defaultsObjects.ClassPlayHistory()
const capturedPiece = new defaultsObjects.ClassCapturedPiece ()

const nameKing = "Kingwhite"
const lastRefKing = 'ref11'
const lastKing = defaultsObjects.factoryMakePiece.apply({chessBoard},["King",nameKing,"white","kingWhite",lastRefKing,movementsPossibilities.king])
piecesBoard.addPieceOfRef(nameKing,lastKing)
lastKing.changePosition(lastRefKing)
chessBoard.addPieceOfRef(lastRefKing,lastKing)

const lastHistory = {
    newRefId: [lastRefKing],
    pieceCaptured: null,
    piecesPlayed: [{...lastKing}],
    typeMovement: "movementPiece"
}
playHistory.setHistory(lastHistory)
const newKing = {...lastKing}
const newRefKing = "ref18"
newKing.changePosition(newRefKing)
chessBoard.deletePieceOfRef(lastRefKing ,newKing)
chessBoard.addPieceOfRef(newRefKing,newKing)

describe("Return Movement - Change Piece", ()=>{
    test("Should return movement ",()=>{
        returnChangePiece(chessBoard,piecesBoard,playHistory,capturedPiece)
        expect(chessBoard.reference[lastRefKing]).toEqual(lastKing)
    })
    
})