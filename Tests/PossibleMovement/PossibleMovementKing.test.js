import possibleMovementKing from "../../Game/PossibleMovement/PossibleMovementKing.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ChessBoard from "../../Game/DefaultsObjects/ClassChessBoard.js"

const king = makePiece("King","kingWhite","white","Kingwhite","ref11",possibleMovementKing)
const chessBoard = new ChessBoard ()

describe("Possible Movement King", ()=>{
    test("The king should have possible moves",()=>{
        const refID = "ref44"
        king.changePosition(refID)
        chessBoard.addPieceOfRef(refID,king)
        const possibleMovements = king.functionPiece(chessBoard.reference)
        expect(possibleMovements).not.toEqual([])

        const refPossibleMovement = "ref45"
        expect(possibleMovements).toContain(refPossibleMovement)

        chessBoard.deletePieceOfRef(refID)
    })
    test("The king should have possible eat adversary piece",()=>{
        const refID = "ref11"
        king.changePosition(refID)
        chessBoard.addPieceOfRef(refID,king)
        const refAdversaryPiece= "ref22"
        const adversaryPiece = makePiece("King-Left","King-black","black","kingBlack",refAdversaryPiece,possibleMovementKing)
        chessBoard.addPieceOfRef(refAdversaryPiece,adversaryPiece)
        const possibleMovements = king.functionPiece(chessBoard.reference)
        expect(possibleMovements).toContain(refAdversaryPiece)

        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(refAdversaryPiece)
    })
    test("The king should not have possible moves",()=>{
        const refID = "ref11"
        king.position=refID
        king.changePosition(refID)
        const refAllyPiece= ["ref12","ref22","ref21"]
        const allyPiece = makePiece("Pawn-1","Pawn-1-white","white","Pawn-2White",refAllyPiece,possibleMovementKing)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.addPieceOfRef(refIdAlly,allyPiece)
        })
        const possibleMovements = king.functionPiece(chessBoard.reference)
        expect(possibleMovements).toEqual([])
        
        chessBoard.deletePieceOfRef(refID)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.deletePieceOfRef(refIdAlly)
        })
    })
}
)