import possibleMovementPawn from "../../Game/PossibleMovement/PossibleMovementPawn.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ChessBoard from "../../Game/DefaultsObjects/ClassChessBoard.js"

const bottomPieceColor = "white"
const pawn = makePiece("Pawn","pawnWhite","white","Pawnwhite","ref11",possibleMovementPawn)
const chessBoard = new ChessBoard ()

describe("Possible Movement Pawn", ()=>{
    test("The pawn should have possible moves",()=>{
        const refID = "ref12"
        pawn.changePosition(refID)
        chessBoard.addPieceOfRef(refID,pawn)
        const possibleMovements = pawn.functionPiece(chessBoard.reference,bottomPieceColor)
        expect(possibleMovements).not.toEqual([])

        const refPossibleMovement = "ref13"
        expect(possibleMovements).toContain(refPossibleMovement)

        chessBoard.deletePieceOfRef(refID)
    })
    test("Should be possible for the pawn to jump two squares on the first move",()=>{
        const refID = "ref12"
        pawn.changePosition(refID)
        chessBoard.addPieceOfRef(refID,pawn)
        const possibleMovements = pawn.functionPiece(chessBoard.reference,bottomPieceColor)
        const refPossibleMovement = "ref14"
        expect(possibleMovements).toContain(refPossibleMovement)    

        chessBoard.deletePieceOfRef(refID)
    })
    test("The pawn should have possible eat adversary piece",()=>{
        const refID = "ref11"
        pawn.changePosition(refID)
        chessBoard.addPieceOfRef(refID,pawn)
        const refAdversaryPiece= "ref22"
        const adversaryPiece = makePiece("Pawn-Left","Pawn-black","black","pawnBlack",refAdversaryPiece,possibleMovementPawn)
        chessBoard.addPieceOfRef(refAdversaryPiece,adversaryPiece)
        const possibleMovements = pawn.functionPiece(chessBoard.reference,bottomPieceColor)
        expect(possibleMovements).toContain(refAdversaryPiece)

        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(refAdversaryPiece)
    })
    test("The pawn should not have possible moves",()=>{
        const refID = "ref11"
        pawn.position=refID
        pawn.changePosition(refID)
        const refAllyPiece= "ref12"
        const allyPiece = makePiece("Pawn-1","Pawn-1-white","white","Pawn-2White",refAllyPiece,possibleMovementPawn)
        chessBoard.addPieceOfRef(refAllyPiece,allyPiece)
        const possibleMovements = pawn.functionPiece(chessBoard.reference,bottomPieceColor)
        expect(possibleMovements).toEqual([])
        
        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(allyPiece)
    })
}
)
