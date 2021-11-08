import assistantKing from "../../Game/PlayAssistance/AssistantKing.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()

const nameKing = "Kingwhite"
const colorKing = "white"
const refIdKing = "ref18"
const king = makePiece.apply({chessBoard},["King",nameKing,"white","kingWhite",refIdKing,movementsPossibilities.king])
piecesBoard.addPieceOfRef(nameKing,king)
king.changePosition(refIdKing)
chessBoard.addPieceOfRef(refIdKing,king)

let refIdBishop = "ref11"
const bishop = makePiece.apply({chessBoard},["Bishop-Left","Bishop-Leftblack","black","bishopBlack",refIdBishop,movementsPossibilities.bishop])
piecesBoard.addPieceOfRef("Bishop-Leftblack",bishop)
chessBoard.addPieceOfRef(refIdBishop,bishop)

describe("Assistant King", ()=>{
    test("No Should have assistant ",()=>{
        refIdBishop = "ref15"
        bishop.changePosition(refIdBishop)
        movementsPossibilities.updateAllMovements(piecesBoard)
        assistantKing(colorKing,chessBoard,piecesBoard)
        const movementsKing = ["ref27", "ref17", "ref28"]
        expect(king.refMovements).toEqual(movementsKing)
    })
    
    test("Should have assistant",()=>{
        refIdBishop = "ref26"
        bishop.changePosition(refIdBishop)
        movementsPossibilities.updateAllMovements(piecesBoard)
        assistantKing(colorKing,chessBoard,piecesBoard)
        const movementsKing = ["ref27", "ref28"]
        expect(king.refMovements).toEqual(movementsKing)
    })
})