import changePiecePosition from "../../Game/MovementPiece/ChangePiecePosition.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ClassChessBoard from "../../Game/DefaultsObjects/ClassChessBoard.js"
import ClassCapturedPiece from "../../Game/DefaultsObjects/ClassCapturedPiece.js"

const chessBoard = new ClassChessBoard ()
const capturedPiece = new ClassCapturedPiece ()
const refID = "ref12"
const fullNamePiece = "Pawn-1white"
const possibleMovement = () => {}
const pawn = makePiece("Pawn-1",fullNamePiece,"white","pawn-1White",refID,possibleMovement)
chessBoard.addPieceOfRef(refID,pawn)

describe("Change Piece Position", ()=>{
    test("Should change piece position",()=>{
        const typeMovement = "movementPiece"
        const newRefId = "ref13"
        const informationPiecetoMove = {            
            color: "white",
            fullName: fullNamePiece,
            piecePromotion: null,
            refId: newRefId,
            specialMovement: false,
            typeMovement: typeMovement}
        changePiecePosition(pawn,informationPiecetoMove,chessBoard,capturedPiece)
        expect(chessBoard.reference[refID]).toBeNull()

        expect(chessBoard.reference[newRefId]).toEqual(pawn)
    })
})