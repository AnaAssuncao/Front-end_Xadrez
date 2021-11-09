import assistantKing from "../../Game/PlayAssistance/AssistantKing.js"
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

let refIdAdversary= "ref11"
const pieceAdversary = defaultsObjects.factoryMakePiece.apply({chessBoard},["Bishop-Left","Bishop-Leftblack","black","bishopBlack",refIdAdversary,movementsPossibilities.bishop])
piecesBoard.addPieceOfRef("Bishop-Leftblack",pieceAdversary)
chessBoard.addPieceOfRef(refIdAdversary,pieceAdversary)

describe("Assistant King", ()=>{
    test("No Should have assistance ",()=>{
        refIdAdversary = "ref15"
        pieceAdversary.changePosition(refIdAdversary)
        movementsPossibilities.updateAllMovements(piecesBoard)
        assistantKing(colorKing,chessBoard,piecesBoard)
        const movementsKing = ["ref27", "ref17", "ref28"]
        expect(king.refMovements).toEqual(movementsKing)
    })
    
    test("Should have assistance",()=>{
        refIdAdversary = "ref26"
        pieceAdversary.changePosition(refIdAdversary)
        movementsPossibilities.updateAllMovements(piecesBoard)
        assistantKing(colorKing,chessBoard,piecesBoard)
        const movementsKing = ["ref27", "ref28"]
        expect(king.refMovements).toEqual(movementsKing)
    })
})