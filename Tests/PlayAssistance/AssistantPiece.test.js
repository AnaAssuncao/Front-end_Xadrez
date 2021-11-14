import assistantPiece from "../../Game/PlayAssistance/AssistantPiece.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()

const colorKing = "white"
const createPiece = (typePiece, namePiece, refPiece,colorPiece)=>{
    const piece = defaultsObjects.factoryMakePiece.apply({chessBoard},[typePiece,namePiece,colorPiece,namePiece,refPiece,movementsPossibilities[typePiece]])
    piecesBoard.addPieceOfRef(namePiece,piece)
    piece.changePosition(refPiece)
    chessBoard.addPieceOfRef(refPiece,piece)
    return piece
}
const kingWhite = createPiece("king","Kingwhite","ref18",colorKing)
const knightWhite = createPiece("knight","Knighthite","ref27",colorKing)
const pieceAdversary = createPiece("bishop","Bishop-Leftblack","ref45","black")

describe("assistant Piece", ()=>{
    test("Should have assistance",()=>{
        movementsPossibilities.updateAllMovements(piecesBoard)
        assistantPiece(colorKing,chessBoard,piecesBoard)
        expect(knightWhite.refMovements).toEqual([])
    })
})