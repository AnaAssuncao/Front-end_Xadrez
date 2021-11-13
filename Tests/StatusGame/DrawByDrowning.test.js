import drawByDrowning from "../../Game/UpdateStatusGame/DrawByDrowning.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"
import playAssistance from "../../Game/PlayAssistance/index.js"

const colors={
    top:"black",
    bottom:"white"
}
const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const statusGame = new defaultsObjects.ClassStatusGame(colors)

const createPiece = (typePiece, namePiece, refPiece,colorPiece)=>{
    const piece = defaultsObjects.factoryMakePiece.apply({chessBoard,statusGame},[typePiece,namePiece,colorPiece,namePiece,refPiece,movementsPossibilities[typePiece]])
    piecesBoard.addPieceOfRef(namePiece,piece)
    piece.changePosition(refPiece)
    chessBoard.addPieceOfRef(refPiece,piece)
    return piece
}

const kingWhite = createPiece("king","Kingwhite","ref21","white")
const pawnWhite = createPiece("pawn","Pawnwhite","ref86","white")
const kingBlack = createPiece("king","Kingblack","ref23","black")
const pawn1Black = createPiece("pawn","Pawn-1black","ref22","black")
const pawn2Black = createPiece("pawn","Pawn-2black","ref87","black")
 
movementsPossibilities.updateAllMovements(piecesBoard)
playAssistance.updateFilterMovement.apply({chessBoard,piecesBoard,statusGame},["white"])

describe("Draw By Drowning", ()=>{   
    test("Should draw",()=>{
        expect(drawByDrowning(piecesBoard,statusGame)).toBeTruthy()
    })
})