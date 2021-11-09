import pathToCheck from "../../Game/UpdateStatusGame/PathToCheck.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()

const nameKing = "Kingwhite"
const refIdKing = "ref11"
const king = defaultsObjects.factoryMakePiece.apply({chessBoard},["King",nameKing,"white","kingWhite",refIdKing,movementsPossibilities.king])
piecesBoard.addPieceOfRef(nameKing,king)
king.changePosition(refIdKing)
const nameBishop= "Bishop-Leftblack"
const bishop = defaultsObjects.factoryMakePiece.apply({chessBoard},["Bishop-Left",nameBishop,"black","bishopBlack","ref11",movementsPossibilities.bishop])
piecesBoard.addPieceOfRef(nameBishop,bishop)
movementsPossibilities.updateAllMovements(piecesBoard)

describe("Path To Check", ()=>{   
    test("Should return path To Check",()=>{
        let checks = {
            qt:1,
            pieceCheck:nameBishop
        }
        bishop.changePosition("ref44")
        const path = pathToCheck(nameKing,checks,piecesBoard)
        expect(path).toEqual(  expect.arrayContaining(["ref22","ref33"]))
    })
})