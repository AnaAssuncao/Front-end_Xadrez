import drawByFiftyRules from "../../Game/UpdateStatusGame/DrawByFiftyRules.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const playHistory = new defaultsObjects.ClassPlayHistory()

const createPiece = (typePiece, namePiece, refPiece,colorPiece)=>{
    const piece = defaultsObjects.factoryMakePiece.apply({chessBoard},[typePiece,namePiece,colorPiece,namePiece,refPiece,movementsPossibilities[typePiece]])
    piece.changePosition(refPiece)
    chessBoard.addPieceOfRef(refPiece,piece)
    return piece
}

const kingWhite = createPiece("king","Kingwhite","ref25","white")
const queenBlack = createPiece("queen","QueenBlack","ref45","black")

const movementsPieces = [["king","ref25"],["queen","ref45"],["king","ref24"],["queen","ref44"],
        ["king","ref25"],["queen","ref45"],["king","ref24"],["queen","ref44"],
]
movementsPieces.forEach((movements)=>{
    const piece = (movements[0]==="king")?kingWhite:queenBlack
    const history =  {piecesPlayed:[piece], pieceCaptured:null, newRefId:[movements[1]], typeMovement:"movementPiece"}
    playHistory.setHistory(history)
})

describe("Draw By Fifty Rules ", ()=>{   
    test("Should draw",()=>{
        expect(drawByFiftyRules(playHistory,8)).toBeTruthy()
    })
})