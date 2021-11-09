import changePiecePosition from "../../Game/MakeMovements/ChangePiecePosition.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const capturedPiece = new defaultsObjects.ClassCapturedPiece ()
const refID = "ref12"
const fullNamePiece = "Pawn-1white"
const possibleMovement = () => {}
const pawn = defaultsObjects.factoryMakePiece("Pawn-1",fullNamePiece,"white","pawn-1White",refID,possibleMovement)
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