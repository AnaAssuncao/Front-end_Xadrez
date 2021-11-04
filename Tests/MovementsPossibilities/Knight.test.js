import possibleMovementKnight from "../../Game/MovementsPossibilities/Knight.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ChessBoard from "../../Game/DefaultsObjects/ClassChessBoard.js"

const knight = makePiece("Knight","knightWhite","white","Knightwhite","ref11",possibleMovementKnight)
const chessBoard = new ChessBoard ()

describe("Possible Movement Knight", ()=>{
    test("The knight should have possible moves",()=>{
        const refID = "ref44"
        knight.changePosition(refID)
        chessBoard.addPieceOfRef(refID,knight)
        const possibleMovements = knight.functionPiece(chessBoard)
        expect(possibleMovements).not.toEqual([])

        const refPossibleMovement = "ref25"
        expect(possibleMovements).toContain(refPossibleMovement)

        chessBoard.deletePieceOfRef(refID)
    })
    test("The knight should have possible eat adversary piece",()=>{
        const refID = "ref11"
        knight.changePosition(refID)
        chessBoard.addPieceOfRef(refID,knight)
        const refAdversaryPiece= "ref23"
        const adversaryPiece = makePiece("Knight-Left","Knight-black","black","knightBlack",refAdversaryPiece,possibleMovementKnight)
        chessBoard.addPieceOfRef(refAdversaryPiece,adversaryPiece)
        const possibleMovements = knight.functionPiece(chessBoard)
        expect(possibleMovements).toContain(refAdversaryPiece)

        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(refAdversaryPiece)
    })
    test("The knight should not have possible moves",()=>{
        const refID = "ref11"
        knight.position=refID
        knight.changePosition(refID)
        const refAllyPiece= ["ref32","ref23"]
        const allyPiece = makePiece("Pawn-1","Pawn-1-white","white","Pawn-2White",refAllyPiece,possibleMovementKnight)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.addPieceOfRef(refIdAlly,allyPiece)
        })
        const possibleMovements = knight.functionPiece(chessBoard)
        expect(possibleMovements).toEqual([])

        chessBoard.deletePieceOfRef(refID)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.deletePieceOfRef(refIdAlly)
        })
    })
}
)