import possibleMovementBishop from "../../Game/PossibleMovement/PossibleMovementBishop.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ChessBoard from "../../Game/DefaultsObjects/ClassChessBoard.js"

const bishop = makePiece("Bishop-Left","Bishop-Leftwhite","white","bishopWhite","ref11",possibleMovementBishop)
const chessBoard = new ChessBoard ()

describe("Possible Movement Bishop", ()=>{
    test("The bishop should have possible moves",()=>{
        const refID = "ref44"
        bishop.changePosition(refID)
        chessBoard.addPieceOfRef(refID,bishop)
        const possibleMovements = bishop.functionPiece(chessBoard.reference)
        expect(possibleMovements).not.toEqual([])

        const refPossibleMovement = "ref77"
        expect(possibleMovements).toContain(refPossibleMovement)

        chessBoard.deletePieceOfRef(refID)
    })
    test("The bishop should have possible eat adversary piece",()=>{
        const refID = "ref11"
        bishop.changePosition(refID)
        chessBoard.addPieceOfRef(refID,bishop)
        const refAdversaryPiece= "ref22"
        const adversaryPiece = makePiece("Bishop-Left","Bishop-black","black","bishopBlack",refAdversaryPiece,possibleMovementBishop)
        chessBoard.addPieceOfRef(refAdversaryPiece,adversaryPiece)
        const possibleMovements = bishop.functionPiece(chessBoard.reference)
        expect(possibleMovements).toContain(refAdversaryPiece)

        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(refAdversaryPiece)
    })
    test("The bishop should not have possible moves",()=>{
        const refID = "ref11"
        bishop.position=refID
        bishop.changePosition(refID)
        const refAllyPiece= "ref22"
        const allyPiece = makePiece("Pawn-1","Pawn-1-white","white","Pawn-2White",refAllyPiece,possibleMovementBishop)
        chessBoard.addPieceOfRef(refAllyPiece,allyPiece)
        const possibleMovements = bishop.functionPiece(chessBoard.reference)
        expect(possibleMovements).toEqual([])
        
        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(allyPiece)
    })
}
)