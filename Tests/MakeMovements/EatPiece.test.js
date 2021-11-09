import eatPiece from "../../Game/MakeMovements/EatPiece.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"

const capturedPiece = new defaultsObjects.ClassCapturedPiece ()
const possibleMovement = ()=>{}
const fullName = "Kingwhite"
const king = defaultsObjects.factoryMakePiece("King",fullName,"white","kingWhite","ref11",possibleMovement)

describe("Change Piece Position", ()=>{
    test("Should captured piece",()=>{
        eatPiece(king,capturedPiece)
        expect(king.isAtive).toBeFalsy()
       expect(capturedPiece.pieces[fullName]).toEqual(king)
    })
})
