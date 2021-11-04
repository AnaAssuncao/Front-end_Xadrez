import possibleMovementQueen from "../../Game/MovementsPossibilities/Queen.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ChessBoard from "../../Game/DefaultsObjects/ClassChessBoard.js"

const queen = makePiece("Queen","queenWhite","white","Queenwhite","ref11",possibleMovementQueen)
const chessBoard = new ChessBoard ()

describe("Possible Movement Queen", ()=>{
    test("The queen should have possible moves",()=>{
        const refID = "ref44"
        queen.changePosition(refID)
        chessBoard.addPieceOfRef(refID,queen)
        const possibleMovements = queen.functionPiece(chessBoard)
        expect(possibleMovements).not.toEqual([])

        const refPossibleMovement = "ref84"
        expect(possibleMovements).toContain(refPossibleMovement)

        chessBoard.deletePieceOfRef(refID)
    })
    test("The queen should have possible eat adversary piece",()=>{
        const refID = "ref11"
        queen.changePosition(refID)
        chessBoard.addPieceOfRef(refID,queen)
        const refAdversaryPiece= "ref66"
        const adversaryPiece = makePiece("Queen-Left","Queen-black","black","queenBlack",refAdversaryPiece,possibleMovementQueen)
        chessBoard.addPieceOfRef(refAdversaryPiece,adversaryPiece)
        const possibleMovements = queen.functionPiece(chessBoard)
        expect(possibleMovements).toContain(refAdversaryPiece)

        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(refAdversaryPiece)
    })
    test("The queen should not have possible moves",()=>{
        const refID = "ref11"
        queen.position=refID
        queen.changePosition(refID)
        const refAllyPiece= ["ref12","ref22","ref21"]
        const allyPiece = makePiece("Pawn-1","Pawn-1-white","white","Pawn-2White",refAllyPiece,possibleMovementQueen)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.addPieceOfRef(refIdAlly,allyPiece)
        })
        const possibleMovements = queen.functionPiece(chessBoard)
        expect(possibleMovements).toEqual([])

        chessBoard.deletePieceOfRef(refID)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.deletePieceOfRef(refIdAlly)
        })
    })
}
)