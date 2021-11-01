import possibleMovementKnight from "../../Game/PossibleMovement/PossibleMovementKnight.js"
import {noMove,withMove,withMoveToEat} from "./PossibleMovementObj.js"

const knight={
    color: "white",
    fullName: "Knight-Leftwhite",
    functionPiece: possibleMovementKnight,
    imgName: "knightWhite",
    isAtive: true,
    name: "Knight-Left",
    position: null,
    possibleSpecialMovements: [],
    qtMovements: 0,
    refMovements: []
}

describe("Possible Movement Knight", ()=>{
    test("The knight must not have possible moves",()=>{
        knight.position="ref11"
        const chessBoardTest = noMove(knight)
        const possibleMovements = knight.functionPiece(chessBoardTest)
        expect(possibleMovements).toEqual([])
    })
    test("The knight must have possible moves",()=>{
        knight.position="ref44"
        const chessBoardTest = withMove(knight)
        const possibleMovements = knight.functionPiece(chessBoardTest)
        expect(possibleMovements).not.toEqual([])
        const refPossibleMovement = "ref25"
        expect(possibleMovements).toContain(refPossibleMovement)
    })
    test("The knight must have possible moves",()=>{
        knight.position="ref11"
        const refAdversaryPiece= "ref23"
        const chessBoardTest = withMoveToEat(knight,refAdversaryPiece)
        const possibleMovements = knight.functionPiece(chessBoardTest)
        expect(possibleMovements).toContain(refAdversaryPiece)
    })
}
)