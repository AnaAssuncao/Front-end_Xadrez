import eatPiece from "../../Game/MovementPiece/EatPiece.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ClassCapturedPiece from "../../Game/DefaultsObjects/ClassCapturedPiece.js"

const capturedPiece = new ClassCapturedPiece ()
const possibleMovement = ()=>{}
const fullName = "Kingwhite"
const king = makePiece("King",fullName,"white","kingWhite","ref11",possibleMovement)

describe("Change Piece Position", ()=>{
    test("Should captured piece",()=>{
        eatPiece(king,capturedPiece)
        expect(king.isAtive).toBeFalsy()
       expect(capturedPiece.pieces[fullName]).toEqual(king)
    })
})
