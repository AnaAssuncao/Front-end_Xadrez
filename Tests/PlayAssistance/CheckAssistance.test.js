import assistantPiece from "../../Game/PlayAssistance/AssistantPiece.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const color={
    top:"white",
    bottom:"black"
}
const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const statusGame = new defaultsObjects.ClassStatusGame(color)

const nameKing = "Kingwhite"
const colorKing = "white"
const refIdKing = "ref18"
const king = makePiece.apply({chessBoard},["King",nameKing,"white","kingWhite",refIdKing,movementsPossibilities.king])
piecesBoard.addPieceOfRef(nameKing,king)
king.changePosition(refIdKing)
chessBoard.addPieceOfRef(refIdKing,king)

let refIdBishop = "ref84"
const bishop = makePiece.apply({chessBoard},["Bishop-Left","Bishop-Leftwhite","white","bishopWhite",refIdBishop,movementsPossibilities.bishop])
piecesBoard.addPieceOfRef("Bishop-Leftwhite",bishop)
chessBoard.addPieceOfRef(refIdBishop,bishop)

let  refIdAdversary= "ref45"
const pieceAdversary = makePiece.apply({chessBoard},["Bishop-Left","Bishop-Leftblack","black","bishopBlack",refIdAdversary,movementsPossibilities.bishop])
piecesBoard.addPieceOfRef("Bishop-Leftblack",pieceAdversary)
chessBoard.addPieceOfRef(refIdAdversary,pieceAdversary)

describe("assistant Piece", ()=>{
    test("Should have assistance",()=>{
        statusGame.color=colorKing
        statusGame.check=true
        statusGame.refIdPathsToCheck=[ 'ref27', 'ref36', 'ref45' ]
        movementsPossibilities.updateAllMovements(piecesBoard)
        assistantPiece(colorKing,chessBoard,piecesBoard,statusGame)
        expect(bishop.refMovements).toEqual([])
    })
})