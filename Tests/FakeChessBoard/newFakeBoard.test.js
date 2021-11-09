import {newFakeBoard} from "../../Game/FakeChessBoard/index.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()

const nameKing = "Kingwhite"
const colorKing = "white"
const refIdKing = "ref18"
const king = defaultsObjects.factoryMakePiece.apply({chessBoard},["King",nameKing,"white","kingWhite",refIdKing,movementsPossibilities.king])
piecesBoard.addPieceOfRef(nameKing,king)
king.changePosition(refIdKing)
chessBoard.addPieceOfRef(refIdKing,king)

describe("New Fake Chess Board", ()=>{
    test("Shoul new fake chess board",()=>{
        const newRefId = "ref55"
        const fakeBoard = newFakeBoard(refIdKing,newRefId,chessBoard)
        const newChessBoard = new defaultsObjects.ClassChessBoard()
        newChessBoard.addPieceOfRef(newRefId,king)
        expect(fakeBoard).toEqual(newChessBoard)
    })
})

